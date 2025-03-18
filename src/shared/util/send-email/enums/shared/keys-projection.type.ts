export type KeysProjection<TRecord extends object> = {
  [K in keyof TRecord]: K;
};
