type ResultParams<T> = {
  value?: T;
  error?: string;
  isSuccess?: boolean;
};

export class Result<T> {
  private _value: T;
  private _errorMessage: string;
  private _isSuccess: boolean;

  get value() {
    return this._value;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  get succeeded() {
    return this._isSuccess;
  }

  get failed() {
    return !this._isSuccess;
  }

  private constructor({ value, error, isSuccess }: ResultParams<T>) {
    this._value = value ?? null;
    this._errorMessage = error ?? null;
    this._isSuccess = isSuccess ?? true;
  }

  static success<U>(value?: U): Result<U> {
    return new Result({ value });
  }

  static fail<U>(message: string): Result<U> {
    return new Result({ error: message, isSuccess: false });
  }
}
