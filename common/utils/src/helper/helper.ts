import { Injectable } from '@nestjs/common';
import get from 'lodash.get';

@Injectable()
export class HelperUtil {
  public get = (object: object, path: Array<any> | string, defaultValue?: any) => {
    return get(object, path, defaultValue);
  };
}
