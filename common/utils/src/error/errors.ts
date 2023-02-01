import { Injectable, HttpStatus } from '@nestjs/common';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export interface ErrorUtilOptions {
  /*** Http status code as `400` or other.
   ** The [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
   * ```ts
   * import { HttpStatus } from '@nestjs/common';
   * const statusCode = HttpStatus.BAD_REQUEST //400;
   * ```
   */
  statusCode: StatusCodes;
  /** Error data to client */
  message: unknown;
}
/*** Data to form an error on the api service.*/
export interface ExtensionsErrorUtil {
  /*** Code error from HttpStatus as `BAD_REQUEST`
   ** The [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
   * ```ts
   * import { HttpStatus } from '@nestjs/common';
   * const code = HttpStatus[400]; //BAD_REQUEST
   * ```
   */
  code: string;
  response: ErrorUtilOptions & {
    /*** Message http error as `Bad Request` or other.*/
    error: ReasonPhrases[number];
  };
}

export interface SendErrorUtil {
  response: object;
  status: HttpStatus;
  options: object;
  message: string;
  name: string;
}

/*** GraphQL Error Handler
 ** Have several method as:
 * @method send();
 * @method response();
 * @method sendClient()
 */
@Injectable()
export class ErrorUtil extends Error {
  public extensions: ExtensionsErrorUtil = null;
  public message: string = null;
  public httpStatusCode: HttpStatus = null;
  constructor(
    /*** The code http error.
     ** The [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
     */
    code?: HttpStatus,
  ) {
    super();
    this.httpStatusCode = code || HttpStatus.BAD_REQUEST;
    this.message = getReasonPhrase(this.httpStatusCode);
  }
  /*** Return the data to client.
   * @param err  It's data from api service.
   */
  sendClient = (err: GraphQLError): GraphQLError => {
    const { extensions } = err;
    delete extensions.exception;
    if (err.message?.startsWith('Variable ')) {
      return new ErrorUtil(400).formatErrorVariable(err);
    }
    if (err.message?.startsWith('Error: ')) {
      return new ErrorUtil().formatErrorResponse(err);
    }

    return new ErrorUtil().formatErrorValidatePip(err);
  };

  /*** Return the data to `formatError` into `apollo`.
   * @param extensions  It's data from answer microservice.
   */
  public response = (data: SendErrorUtil): GraphQLError => {
    const code = HttpStatus[this.httpStatusCode];
    return new GraphQLError(`${'Error'}: ${this.message}`, {
      extensions: {
        response: {
          ...data.response,
          ...data.options,
        },
        code,
      },
    });
  };

  /*** Send the data to the api service. */
  public send = (data: { error: string; payload: unknown }): SendErrorUtil => {
    return new HttpErrorByCode[this.httpStatusCode](this.message, data);
  };

  private formatError = (err: GraphQLError): GraphQLError => {
    const { extensions, path } = err;
    delete extensions.exception;
    return new GraphQLError(this.message || err.message, {
      extensions,
      path,
    });
  };

  private formatErrorResponse = (err: GraphQLError): GraphQLError => {
    return this.formatError(err);
  };
  /** Looking a word as  `data.<some word>` or `$<some word>` .*/
  private getProp = (message: string): string | RegExpMatchArray => {
    const prop = message.match(/\w+([.])\w+[.a-zA-Z]*/g);
    if (!prop) return message.match(/([$])\w+/g);
    return prop;
  };

  private formatErrorVariable = (err: GraphQLError): GraphQLError => {
    //This add to a property.
    const prop = this.getProp(err.message) || err.message;

    const errorMes = err.message.slice(err.message.indexOf(';') + 1, err.message.length).trim();
    const send = this.send({
      error: 'Property is incorrect',
      payload: [{ ...err.extensions, property: prop[0], err: [errorMes] }],
    });
    err = this.response(send);
    return this.formatError(err);
  };

  private formatErrorValidatePip = (err: GraphQLError): GraphQLError => {
    const { extensions } = err;
    const { response } = extensions;

    let modifyErr: GraphQLErrorExtensions = {};

    modifyErr = {
      statusCode: StatusCodes.BAD_REQUEST,
      response: {
        message: 'Some properties are incorrect',
        payload: {
          property: this.getProp(err.message) || err.message,
          err: err.message,
        },
      },
      error: err.message,
    };

    if (response) {
      const { message } = response as { message: any };

      if (Array.isArray(message)) {
        modifyErr = {
          statusCode: StatusCodes.BAD_REQUEST,
          response: { message: 'Some properties are incorrect', payload: { err: message } },
          error: err.message,
        };
      }
    }

    return this.formatError({
      ...err,
      extensions: {
        ...err.extensions,
        ...modifyErr,
      },
    } as GraphQLError);
  };
}
