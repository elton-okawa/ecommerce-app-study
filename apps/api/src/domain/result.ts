type ResultParams<T> = {
  value?: T;
  error?: string;
  isSuccess?: boolean;
};

export class Result<T> {
  private _value: T;
  private _error: string;
  private _isSuccess: boolean;

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }

  get isSuccess() {
    return this._isSuccess;
  }

  get isError() {
    return !this._isSuccess;
  }

  private constructor({ value, error, isSuccess }: ResultParams<T>) {
    this._value = value ?? null;
    this._error = error ?? null;
    this._isSuccess = isSuccess ?? true;
  }

  static success<U>(value?: U): Result<U> {
    return new Result({ value });
  }

  static error<U>(message: string): Result<U> {
    return new Result({ error: message, isSuccess: false });
  }
}
