export enum PAID {
  /*** 1 */
  expectation = 'expectation',
  /*** 2 */
  paid = 'paid',
  /*** 3 */
  check = 'check',
  /*** 4 */
  ok = 'ok',
  /*** 5 */
  incomplete = 'incomplete',
  /*** 6 */
  mistake = 'mistake',
  /*** 7 */
  refund = 'refund',
  /*** 8 */
  no_refund = 'no_refund',
}

export enum PROCESS {
  /*** 0 */
  unused = 'unused',
  /*** 1 */
  expectation = 'expectation',
  /*** 2 */
  check = 'check',
  /*** 3 */
  complete = 'complete',
  /*** 4 */
  incomplete = 'incomplete',
  /*** 5 */
  cancel = 'cancel',
  /*** 6 */
  mistake = 'mistake',
}

export enum SEND {
  /*** 0 */
  unused = 'unused',
  /*** 1 */
  expectation = 'expectation',
  /*** 2 */
  check = 'check',
  /*** 3 */
  send = 'send',
  /*** 4 */
  stop = 'stop',
  /*** 5 */
  cancel = 'cancel',
}

export enum RECEIVE {
  /*** 0 */
  unused = 'unused',
  /*** 1 */
  expectation = 'expectation',
  /*** 2 */
  check = 'check',
  /*** 3 */
  complete = 'complete',
  /*** 4 */
  exchange = 'exchange',
  /*** 5 */
  fake = 'fake',
}

export enum EXCHANGE {
  /*** 1 */
  unused = 'unused',
  /*** 2 */
  expectation = 'expectation',
  /*** 3 */
  check = 'check',
  /*** 4 */
  ok = 'ok',
  /*** 5 */
  no_refund = 'no-refund',
  /*** 5 */
  refundable = 'refundable',
}
