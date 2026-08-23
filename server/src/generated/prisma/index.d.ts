/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model PasswordCredential
 *
 */
export type PasswordCredential = $Result.DefaultSelection<Prisma.$PasswordCredentialPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Board
 *
 */
export type Board = $Result.DefaultSelection<Prisma.$BoardPayload>;
/**
 * Model BoardMember
 *
 */
export type BoardMember = $Result.DefaultSelection<Prisma.$BoardMemberPayload>;
/**
 * Model Column
 *
 */
export type Column = $Result.DefaultSelection<Prisma.$ColumnPayload>;
/**
 * Model Task
 *
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>;
/**
 * Model Subtask
 *
 */
export type Subtask = $Result.DefaultSelection<Prisma.$SubtaskPayload>;
/**
 * Model Comment
 *
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>;
/**
 * Model TaskHistoryEvent
 *
 */
export type TaskHistoryEvent = $Result.DefaultSelection<Prisma.$TaskHistoryEventPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const BoardMemberRole: {
    OWNER: 'OWNER';
    EDITOR: 'EDITOR';
    VIEWER: 'VIEWER';
  };

  export type BoardMemberRole = (typeof BoardMemberRole)[keyof typeof BoardMemberRole];

  export const TaskPriority: {
    LOW: 'LOW';
    MEDIUM: 'MEDIUM';
    HIGH: 'HIGH';
  };

  export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

  export const TaskHistoryEventType: {
    TASK_CREATED: 'TASK_CREATED';
    TASK_UPDATED: 'TASK_UPDATED';
    TASK_MOVED: 'TASK_MOVED';
    TASK_ARCHIVED: 'TASK_ARCHIVED';
    TASK_RESTORED: 'TASK_RESTORED';
    SUBTASK_ADDED: 'SUBTASK_ADDED';
    SUBTASK_UPDATED: 'SUBTASK_UPDATED';
    SUBTASK_COMPLETED: 'SUBTASK_COMPLETED';
    SUBTASK_REOPENED: 'SUBTASK_REOPENED';
    SUBTASK_DELETED: 'SUBTASK_DELETED';
    COMMENT_ADDED: 'COMMENT_ADDED';
    COMMENT_UPDATED: 'COMMENT_UPDATED';
    COMMENT_DELETED: 'COMMENT_DELETED';
  };

  export type TaskHistoryEventType =
    (typeof TaskHistoryEventType)[keyof typeof TaskHistoryEventType];
}

export type BoardMemberRole = $Enums.BoardMemberRole;

export const BoardMemberRole: typeof $Enums.BoardMemberRole;

export type TaskPriority = $Enums.TaskPriority;

export const TaskPriority: typeof $Enums.TaskPriority;

export type TaskHistoryEventType = $Enums.TaskHistoryEventType;

export const TaskHistoryEventType: typeof $Enums.TaskHistoryEventType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more PasswordCredentials
 * const passwordCredentials = await prisma.passwordCredential.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more PasswordCredentials
   * const passwordCredentials = await prisma.passwordCredential.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.passwordCredential`: Exposes CRUD operations for the **PasswordCredential** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PasswordCredentials
   * const passwordCredentials = await prisma.passwordCredential.findMany()
   * ```
   */
  get passwordCredential(): Prisma.PasswordCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.board`: Exposes CRUD operations for the **Board** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Boards
   * const boards = await prisma.board.findMany()
   * ```
   */
  get board(): Prisma.BoardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.boardMember`: Exposes CRUD operations for the **BoardMember** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more BoardMembers
   * const boardMembers = await prisma.boardMember.findMany()
   * ```
   */
  get boardMember(): Prisma.BoardMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.column`: Exposes CRUD operations for the **Column** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Columns
   * const columns = await prisma.column.findMany()
   * ```
   */
  get column(): Prisma.ColumnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Tasks
   * const tasks = await prisma.task.findMany()
   * ```
   */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtask`: Exposes CRUD operations for the **Subtask** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Subtasks
   * const subtasks = await prisma.subtask.findMany()
   * ```
   */
  get subtask(): Prisma.SubtaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Comments
   * const comments = await prisma.comment.findMany()
   * ```
   */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskHistoryEvent`: Exposes CRUD operations for the **TaskHistoryEvent** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more TaskHistoryEvents
   * const taskHistoryEvents = await prisma.taskHistoryEvent.findMany()
   * ```
   */
  get taskHistoryEvent(): Prisma.TaskHistoryEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions,
  ] extends [Options]
    ? PrismaClientOptions
    : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? ((Without<T, U> & U) | (Without<U, T> & T)) & object
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    PasswordCredential: 'PasswordCredential';
    Session: 'Session';
    User: 'User';
    Board: 'Board';
    BoardMember: 'BoardMember';
    Column: 'Column';
    Task: 'Task';
    Subtask: 'Subtask';
    Comment: 'Comment';
    TaskHistoryEvent: 'TaskHistoryEvent';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'passwordCredential'
        | 'session'
        | 'user'
        | 'board'
        | 'boardMember'
        | 'column'
        | 'task'
        | 'subtask'
        | 'comment'
        | 'taskHistoryEvent';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      PasswordCredential: {
        payload: Prisma.$PasswordCredentialPayload<ExtArgs>;
        fields: Prisma.PasswordCredentialFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PasswordCredentialFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PasswordCredentialFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          findFirst: {
            args: Prisma.PasswordCredentialFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PasswordCredentialFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          findMany: {
            args: Prisma.PasswordCredentialFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>[];
          };
          create: {
            args: Prisma.PasswordCredentialCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          createMany: {
            args: Prisma.PasswordCredentialCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PasswordCredentialCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>[];
          };
          delete: {
            args: Prisma.PasswordCredentialDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          update: {
            args: Prisma.PasswordCredentialUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          deleteMany: {
            args: Prisma.PasswordCredentialDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PasswordCredentialUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PasswordCredentialUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>[];
          };
          upsert: {
            args: Prisma.PasswordCredentialUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PasswordCredentialPayload>;
          };
          aggregate: {
            args: Prisma.PasswordCredentialAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePasswordCredential>;
          };
          groupBy: {
            args: Prisma.PasswordCredentialGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PasswordCredentialGroupByOutputType>[];
          };
          count: {
            args: Prisma.PasswordCredentialCountArgs<ExtArgs>;
            result: $Utils.Optional<PasswordCredentialCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Board: {
        payload: Prisma.$BoardPayload<ExtArgs>;
        fields: Prisma.BoardFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.BoardFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.BoardFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          findFirst: {
            args: Prisma.BoardFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.BoardFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          findMany: {
            args: Prisma.BoardFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[];
          };
          create: {
            args: Prisma.BoardCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          createMany: {
            args: Prisma.BoardCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.BoardCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[];
          };
          delete: {
            args: Prisma.BoardDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          update: {
            args: Prisma.BoardUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          deleteMany: {
            args: Prisma.BoardDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.BoardUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.BoardUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>[];
          };
          upsert: {
            args: Prisma.BoardUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardPayload>;
          };
          aggregate: {
            args: Prisma.BoardAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateBoard>;
          };
          groupBy: {
            args: Prisma.BoardGroupByArgs<ExtArgs>;
            result: $Utils.Optional<BoardGroupByOutputType>[];
          };
          count: {
            args: Prisma.BoardCountArgs<ExtArgs>;
            result: $Utils.Optional<BoardCountAggregateOutputType> | number;
          };
        };
      };
      BoardMember: {
        payload: Prisma.$BoardMemberPayload<ExtArgs>;
        fields: Prisma.BoardMemberFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.BoardMemberFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.BoardMemberFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          findFirst: {
            args: Prisma.BoardMemberFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.BoardMemberFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          findMany: {
            args: Prisma.BoardMemberFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>[];
          };
          create: {
            args: Prisma.BoardMemberCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          createMany: {
            args: Prisma.BoardMemberCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.BoardMemberCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>[];
          };
          delete: {
            args: Prisma.BoardMemberDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          update: {
            args: Prisma.BoardMemberUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          deleteMany: {
            args: Prisma.BoardMemberDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.BoardMemberUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.BoardMemberUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>[];
          };
          upsert: {
            args: Prisma.BoardMemberUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BoardMemberPayload>;
          };
          aggregate: {
            args: Prisma.BoardMemberAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateBoardMember>;
          };
          groupBy: {
            args: Prisma.BoardMemberGroupByArgs<ExtArgs>;
            result: $Utils.Optional<BoardMemberGroupByOutputType>[];
          };
          count: {
            args: Prisma.BoardMemberCountArgs<ExtArgs>;
            result: $Utils.Optional<BoardMemberCountAggregateOutputType> | number;
          };
        };
      };
      Column: {
        payload: Prisma.$ColumnPayload<ExtArgs>;
        fields: Prisma.ColumnFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ColumnFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ColumnFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          findFirst: {
            args: Prisma.ColumnFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ColumnFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          findMany: {
            args: Prisma.ColumnFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[];
          };
          create: {
            args: Prisma.ColumnCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          createMany: {
            args: Prisma.ColumnCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ColumnCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[];
          };
          delete: {
            args: Prisma.ColumnDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          update: {
            args: Prisma.ColumnUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          deleteMany: {
            args: Prisma.ColumnDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ColumnUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ColumnUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[];
          };
          upsert: {
            args: Prisma.ColumnUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>;
          };
          aggregate: {
            args: Prisma.ColumnAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateColumn>;
          };
          groupBy: {
            args: Prisma.ColumnGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ColumnGroupByOutputType>[];
          };
          count: {
            args: Prisma.ColumnCountArgs<ExtArgs>;
            result: $Utils.Optional<ColumnCountAggregateOutputType> | number;
          };
        };
      };
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>;
        fields: Prisma.TaskFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[];
          };
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[];
          };
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[];
          };
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>;
          };
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTask>;
          };
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TaskGroupByOutputType>[];
          };
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>;
            result: $Utils.Optional<TaskCountAggregateOutputType> | number;
          };
        };
      };
      Subtask: {
        payload: Prisma.$SubtaskPayload<ExtArgs>;
        fields: Prisma.SubtaskFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SubtaskFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SubtaskFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          findFirst: {
            args: Prisma.SubtaskFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SubtaskFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          findMany: {
            args: Prisma.SubtaskFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[];
          };
          create: {
            args: Prisma.SubtaskCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          createMany: {
            args: Prisma.SubtaskCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SubtaskCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[];
          };
          delete: {
            args: Prisma.SubtaskDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          update: {
            args: Prisma.SubtaskUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          deleteMany: {
            args: Prisma.SubtaskDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SubtaskUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SubtaskUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[];
          };
          upsert: {
            args: Prisma.SubtaskUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>;
          };
          aggregate: {
            args: Prisma.SubtaskAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSubtask>;
          };
          groupBy: {
            args: Prisma.SubtaskGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SubtaskGroupByOutputType>[];
          };
          count: {
            args: Prisma.SubtaskCountArgs<ExtArgs>;
            result: $Utils.Optional<SubtaskCountAggregateOutputType> | number;
          };
        };
      };
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>;
        fields: Prisma.CommentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[];
          };
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[];
          };
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[];
          };
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>;
          };
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateComment>;
          };
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CommentGroupByOutputType>[];
          };
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>;
            result: $Utils.Optional<CommentCountAggregateOutputType> | number;
          };
        };
      };
      TaskHistoryEvent: {
        payload: Prisma.$TaskHistoryEventPayload<ExtArgs>;
        fields: Prisma.TaskHistoryEventFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TaskHistoryEventFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TaskHistoryEventFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          findFirst: {
            args: Prisma.TaskHistoryEventFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TaskHistoryEventFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          findMany: {
            args: Prisma.TaskHistoryEventFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>[];
          };
          create: {
            args: Prisma.TaskHistoryEventCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          createMany: {
            args: Prisma.TaskHistoryEventCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TaskHistoryEventCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>[];
          };
          delete: {
            args: Prisma.TaskHistoryEventDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          update: {
            args: Prisma.TaskHistoryEventUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          deleteMany: {
            args: Prisma.TaskHistoryEventDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TaskHistoryEventUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TaskHistoryEventUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>[];
          };
          upsert: {
            args: Prisma.TaskHistoryEventUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TaskHistoryEventPayload>;
          };
          aggregate: {
            args: Prisma.TaskHistoryEventAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTaskHistoryEvent>;
          };
          groupBy: {
            args: Prisma.TaskHistoryEventGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TaskHistoryEventGroupByOutputType>[];
          };
          count: {
            args: Prisma.TaskHistoryEventCountArgs<ExtArgs>;
            result: $Utils.Optional<TaskHistoryEventCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     *
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     *
     * Learn more: https://pris.ly/d/driver-adapters
     *
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     *
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     *
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    passwordCredential?: PasswordCredentialOmit;
    session?: SessionOmit;
    user?: UserOmit;
    board?: BoardOmit;
    boardMember?: BoardMemberOmit;
    column?: ColumnOmit;
    task?: TaskOmit;
    subtask?: SubtaskOmit;
    comment?: CommentOmit;
    taskHistoryEvent?: TaskHistoryEventOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number;
    memberships: number;
    comments: number;
    historyEvents: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs;
    comments?: boolean | UserCountOutputTypeCountCommentsArgs;
    historyEvents?: boolean | UserCountOutputTypeCountHistoryEventsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: BoardMemberWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CommentWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHistoryEventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TaskHistoryEventWhereInput;
  };

  /**
   * Count Type BoardCountOutputType
   */

  export type BoardCountOutputType = {
    members: number;
    columns: number;
  };

  export type BoardCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    members?: boolean | BoardCountOutputTypeCountMembersArgs;
    columns?: boolean | BoardCountOutputTypeCountColumnsArgs;
  };

  // Custom InputTypes
  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardCountOutputType
     */
    select?: BoardCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountMembersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: BoardMemberWhereInput;
  };

  /**
   * BoardCountOutputType without action
   */
  export type BoardCountOutputTypeCountColumnsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ColumnWhereInput;
  };

  /**
   * Count Type ColumnCountOutputType
   */

  export type ColumnCountOutputType = {
    tasks: number;
  };

  export type ColumnCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    tasks?: boolean | ColumnCountOutputTypeCountTasksArgs;
  };

  // Custom InputTypes
  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ColumnCountOutputType
     */
    select?: ColumnCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeCountTasksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TaskWhereInput;
  };

  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    subtasks: number;
    comments: number;
    historyEvents: number;
  };

  export type TaskCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    subtasks?: boolean | TaskCountOutputTypeCountSubtasksArgs;
    comments?: boolean | TaskCountOutputTypeCountCommentsArgs;
    historyEvents?: boolean | TaskCountOutputTypeCountHistoryEventsArgs;
  };

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubtasksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SubtaskWhereInput;
  };

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCommentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CommentWhereInput;
  };

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountHistoryEventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TaskHistoryEventWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model PasswordCredential
   */

  export type AggregatePasswordCredential = {
    _count: PasswordCredentialCountAggregateOutputType | null;
    _min: PasswordCredentialMinAggregateOutputType | null;
    _max: PasswordCredentialMaxAggregateOutputType | null;
  };

  export type PasswordCredentialMinAggregateOutputType = {
    userId: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PasswordCredentialMaxAggregateOutputType = {
    userId: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PasswordCredentialCountAggregateOutputType = {
    userId: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PasswordCredentialMinAggregateInputType = {
    userId?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PasswordCredentialMaxAggregateInputType = {
    userId?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PasswordCredentialCountAggregateInputType = {
    userId?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PasswordCredentialAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PasswordCredential to aggregate.
     */
    where?: PasswordCredentialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PasswordCredentials to fetch.
     */
    orderBy?:
      PasswordCredentialOrderByWithRelationInput | PasswordCredentialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PasswordCredentialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PasswordCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PasswordCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PasswordCredentials
     **/
    _count?: true | PasswordCredentialCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PasswordCredentialMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PasswordCredentialMaxAggregateInputType;
  };

  export type GetPasswordCredentialAggregateType<T extends PasswordCredentialAggregateArgs> = {
    [P in keyof T & keyof AggregatePasswordCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordCredential[P]>
      : GetScalarType<T[P], AggregatePasswordCredential[P]>;
  };

  export type PasswordCredentialGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PasswordCredentialWhereInput;
    orderBy?:
      | PasswordCredentialOrderByWithAggregationInput
      | PasswordCredentialOrderByWithAggregationInput[];
    by: PasswordCredentialScalarFieldEnum[] | PasswordCredentialScalarFieldEnum;
    having?: PasswordCredentialScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PasswordCredentialCountAggregateInputType | true;
    _min?: PasswordCredentialMinAggregateInputType;
    _max?: PasswordCredentialMaxAggregateInputType;
  };

  export type PasswordCredentialGroupByOutputType = {
    userId: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PasswordCredentialCountAggregateOutputType | null;
    _min: PasswordCredentialMinAggregateOutputType | null;
    _max: PasswordCredentialMaxAggregateOutputType | null;
  };

  type GetPasswordCredentialGroupByPayload<T extends PasswordCredentialGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<PasswordCredentialGroupByOutputType, T['by']> & {
          [P in keyof T & keyof PasswordCredentialGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordCredentialGroupByOutputType[P]>;
        }
      >
    >;

  export type PasswordCredentialSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['passwordCredential']
  >;

  export type PasswordCredentialSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['passwordCredential']
  >;

  export type PasswordCredentialSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['passwordCredential']
  >;

  export type PasswordCredentialSelectScalar = {
    userId?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PasswordCredentialOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'userId' | 'passwordHash' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['passwordCredential']
  >;
  export type PasswordCredentialInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type PasswordCredentialIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type PasswordCredentialIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $PasswordCredentialPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'PasswordCredential';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['passwordCredential']
    >;
    composites: {};
  };

  type PasswordCredentialGetPayload<
    S extends boolean | null | undefined | PasswordCredentialDefaultArgs,
  > = $Result.GetResult<Prisma.$PasswordCredentialPayload, S>;

  type PasswordCredentialCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<PasswordCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PasswordCredentialCountAggregateInputType | true;
  };

  export interface PasswordCredentialDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['PasswordCredential'];
      meta: { name: 'PasswordCredential' };
    };
    /**
     * Find zero or one PasswordCredential that matches the filter.
     * @param {PasswordCredentialFindUniqueArgs} args - Arguments to find a PasswordCredential
     * @example
     * // Get one PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordCredentialFindUniqueArgs>(
      args: SelectSubset<T, PasswordCredentialFindUniqueArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one PasswordCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordCredentialFindUniqueOrThrowArgs} args - Arguments to find a PasswordCredential
     * @example
     * // Get one PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordCredentialFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PasswordCredentialFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PasswordCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialFindFirstArgs} args - Arguments to find a PasswordCredential
     * @example
     * // Get one PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordCredentialFindFirstArgs>(
      args?: SelectSubset<T, PasswordCredentialFindFirstArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PasswordCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialFindFirstOrThrowArgs} args - Arguments to find a PasswordCredential
     * @example
     * // Get one PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordCredentialFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PasswordCredentialFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more PasswordCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordCredentials
     * const passwordCredentials = await prisma.passwordCredential.findMany()
     *
     * // Get first 10 PasswordCredentials
     * const passwordCredentials = await prisma.passwordCredential.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const passwordCredentialWithUserIdOnly = await prisma.passwordCredential.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends PasswordCredentialFindManyArgs>(
      args?: SelectSubset<T, PasswordCredentialFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a PasswordCredential.
     * @param {PasswordCredentialCreateArgs} args - Arguments to create a PasswordCredential.
     * @example
     * // Create one PasswordCredential
     * const PasswordCredential = await prisma.passwordCredential.create({
     *   data: {
     *     // ... data to create a PasswordCredential
     *   }
     * })
     *
     */
    create<T extends PasswordCredentialCreateArgs>(
      args: SelectSubset<T, PasswordCredentialCreateArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<Prisma.$PasswordCredentialPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many PasswordCredentials.
     * @param {PasswordCredentialCreateManyArgs} args - Arguments to create many PasswordCredentials.
     * @example
     * // Create many PasswordCredentials
     * const passwordCredential = await prisma.passwordCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PasswordCredentialCreateManyArgs>(
      args?: SelectSubset<T, PasswordCredentialCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PasswordCredentials and returns the data saved in the database.
     * @param {PasswordCredentialCreateManyAndReturnArgs} args - Arguments to create many PasswordCredentials.
     * @example
     * // Create many PasswordCredentials
     * const passwordCredential = await prisma.passwordCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PasswordCredentials and only return the `userId`
     * const passwordCredentialWithUserIdOnly = await prisma.passwordCredential.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PasswordCredentialCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PasswordCredentialCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a PasswordCredential.
     * @param {PasswordCredentialDeleteArgs} args - Arguments to delete one PasswordCredential.
     * @example
     * // Delete one PasswordCredential
     * const PasswordCredential = await prisma.passwordCredential.delete({
     *   where: {
     *     // ... filter to delete one PasswordCredential
     *   }
     * })
     *
     */
    delete<T extends PasswordCredentialDeleteArgs>(
      args: SelectSubset<T, PasswordCredentialDeleteArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<Prisma.$PasswordCredentialPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one PasswordCredential.
     * @param {PasswordCredentialUpdateArgs} args - Arguments to update one PasswordCredential.
     * @example
     * // Update one PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PasswordCredentialUpdateArgs>(
      args: SelectSubset<T, PasswordCredentialUpdateArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<Prisma.$PasswordCredentialPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more PasswordCredentials.
     * @param {PasswordCredentialDeleteManyArgs} args - Arguments to filter PasswordCredentials to delete.
     * @example
     * // Delete a few PasswordCredentials
     * const { count } = await prisma.passwordCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PasswordCredentialDeleteManyArgs>(
      args?: SelectSubset<T, PasswordCredentialDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PasswordCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordCredentials
     * const passwordCredential = await prisma.passwordCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PasswordCredentialUpdateManyArgs>(
      args: SelectSubset<T, PasswordCredentialUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PasswordCredentials and returns the data updated in the database.
     * @param {PasswordCredentialUpdateManyAndReturnArgs} args - Arguments to update many PasswordCredentials.
     * @example
     * // Update many PasswordCredentials
     * const passwordCredential = await prisma.passwordCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PasswordCredentials and only return the `userId`
     * const passwordCredentialWithUserIdOnly = await prisma.passwordCredential.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PasswordCredentialUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PasswordCredentialUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one PasswordCredential.
     * @param {PasswordCredentialUpsertArgs} args - Arguments to update or create a PasswordCredential.
     * @example
     * // Update or create a PasswordCredential
     * const passwordCredential = await prisma.passwordCredential.upsert({
     *   create: {
     *     // ... data to create a PasswordCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordCredential we want to update
     *   }
     * })
     */
    upsert<T extends PasswordCredentialUpsertArgs>(
      args: SelectSubset<T, PasswordCredentialUpsertArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<Prisma.$PasswordCredentialPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of PasswordCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialCountArgs} args - Arguments to filter PasswordCredentials to count.
     * @example
     * // Count the number of PasswordCredentials
     * const count = await prisma.passwordCredential.count({
     *   where: {
     *     // ... the filter for the PasswordCredentials we want to count
     *   }
     * })
     **/
    count<T extends PasswordCredentialCountArgs>(
      args?: Subset<T, PasswordCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordCredentialCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PasswordCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PasswordCredentialAggregateArgs>(
      args: Subset<T, PasswordCredentialAggregateArgs>,
    ): Prisma.PrismaPromise<GetPasswordCredentialAggregateType<T>>;

    /**
     * Group by PasswordCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PasswordCredentialGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: PasswordCredentialGroupByArgs['orderBy'] }
        : { orderBy?: PasswordCredentialGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, PasswordCredentialGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetPasswordCredentialGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PasswordCredential model
     */
    readonly fields: PasswordCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordCredentialClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PasswordCredential model
   */
  interface PasswordCredentialFieldRefs {
    readonly userId: FieldRef<'PasswordCredential', 'String'>;
    readonly passwordHash: FieldRef<'PasswordCredential', 'String'>;
    readonly createdAt: FieldRef<'PasswordCredential', 'DateTime'>;
    readonly updatedAt: FieldRef<'PasswordCredential', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * PasswordCredential findUnique
   */
  export type PasswordCredentialFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter, which PasswordCredential to fetch.
     */
    where: PasswordCredentialWhereUniqueInput;
  };

  /**
   * PasswordCredential findUniqueOrThrow
   */
  export type PasswordCredentialFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter, which PasswordCredential to fetch.
     */
    where: PasswordCredentialWhereUniqueInput;
  };

  /**
   * PasswordCredential findFirst
   */
  export type PasswordCredentialFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter, which PasswordCredential to fetch.
     */
    where?: PasswordCredentialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PasswordCredentials to fetch.
     */
    orderBy?:
      PasswordCredentialOrderByWithRelationInput | PasswordCredentialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PasswordCredentials.
     */
    cursor?: PasswordCredentialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PasswordCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PasswordCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PasswordCredentials.
     */
    distinct?: PasswordCredentialScalarFieldEnum | PasswordCredentialScalarFieldEnum[];
  };

  /**
   * PasswordCredential findFirstOrThrow
   */
  export type PasswordCredentialFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter, which PasswordCredential to fetch.
     */
    where?: PasswordCredentialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PasswordCredentials to fetch.
     */
    orderBy?:
      PasswordCredentialOrderByWithRelationInput | PasswordCredentialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PasswordCredentials.
     */
    cursor?: PasswordCredentialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PasswordCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PasswordCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PasswordCredentials.
     */
    distinct?: PasswordCredentialScalarFieldEnum | PasswordCredentialScalarFieldEnum[];
  };

  /**
   * PasswordCredential findMany
   */
  export type PasswordCredentialFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter, which PasswordCredentials to fetch.
     */
    where?: PasswordCredentialWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PasswordCredentials to fetch.
     */
    orderBy?:
      PasswordCredentialOrderByWithRelationInput | PasswordCredentialOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PasswordCredentials.
     */
    cursor?: PasswordCredentialWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PasswordCredentials from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PasswordCredentials.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PasswordCredentials.
     */
    distinct?: PasswordCredentialScalarFieldEnum | PasswordCredentialScalarFieldEnum[];
  };

  /**
   * PasswordCredential create
   */
  export type PasswordCredentialCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * The data needed to create a PasswordCredential.
     */
    data: XOR<PasswordCredentialCreateInput, PasswordCredentialUncheckedCreateInput>;
  };

  /**
   * PasswordCredential createMany
   */
  export type PasswordCredentialCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many PasswordCredentials.
     */
    data: PasswordCredentialCreateManyInput | PasswordCredentialCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PasswordCredential createManyAndReturn
   */
  export type PasswordCredentialCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * The data used to create many PasswordCredentials.
     */
    data: PasswordCredentialCreateManyInput | PasswordCredentialCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PasswordCredential update
   */
  export type PasswordCredentialUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * The data needed to update a PasswordCredential.
     */
    data: XOR<PasswordCredentialUpdateInput, PasswordCredentialUncheckedUpdateInput>;
    /**
     * Choose, which PasswordCredential to update.
     */
    where: PasswordCredentialWhereUniqueInput;
  };

  /**
   * PasswordCredential updateMany
   */
  export type PasswordCredentialUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update PasswordCredentials.
     */
    data: XOR<
      PasswordCredentialUpdateManyMutationInput,
      PasswordCredentialUncheckedUpdateManyInput
    >;
    /**
     * Filter which PasswordCredentials to update
     */
    where?: PasswordCredentialWhereInput;
    /**
     * Limit how many PasswordCredentials to update.
     */
    limit?: number;
  };

  /**
   * PasswordCredential updateManyAndReturn
   */
  export type PasswordCredentialUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * The data used to update PasswordCredentials.
     */
    data: XOR<
      PasswordCredentialUpdateManyMutationInput,
      PasswordCredentialUncheckedUpdateManyInput
    >;
    /**
     * Filter which PasswordCredentials to update
     */
    where?: PasswordCredentialWhereInput;
    /**
     * Limit how many PasswordCredentials to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PasswordCredential upsert
   */
  export type PasswordCredentialUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * The filter to search for the PasswordCredential to update in case it exists.
     */
    where: PasswordCredentialWhereUniqueInput;
    /**
     * In case the PasswordCredential found by the `where` argument doesn't exist, create a new PasswordCredential with this data.
     */
    create: XOR<PasswordCredentialCreateInput, PasswordCredentialUncheckedCreateInput>;
    /**
     * In case the PasswordCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordCredentialUpdateInput, PasswordCredentialUncheckedUpdateInput>;
  };

  /**
   * PasswordCredential delete
   */
  export type PasswordCredentialDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    /**
     * Filter which PasswordCredential to delete.
     */
    where: PasswordCredentialWhereUniqueInput;
  };

  /**
   * PasswordCredential deleteMany
   */
  export type PasswordCredentialDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which PasswordCredentials to delete
     */
    where?: PasswordCredentialWhereInput;
    /**
     * Limit how many PasswordCredentials to delete.
     */
    limit?: number;
  };

  /**
   * PasswordCredential without action
   */
  export type PasswordCredentialDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    userId: number;
    tokenHash: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SessionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
          : GetScalarType<T[P], SessionGroupByOutputType[P]>;
      }
    >
  >;

  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        userId?: boolean;
        tokenHash?: boolean;
        expiresAt?: boolean;
        createdAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['session']
    >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      tokenHash?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      tokenHash?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
  };

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'userId' | 'tokenHash' | 'expiresAt' | 'createdAt',
      ExtArgs['result']['session']
    >;
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Session';
      objects: {
        user: Prisma.$UserPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          userId: string;
          tokenHash: string;
          expiresAt: Date;
          createdAt: Date;
        },
        ExtArgs['result']['session']
      >;
      composites: {};
    };

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> =
    $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    SessionFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session']; meta: { name: 'Session' } };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<'Session', 'String'>;
    readonly userId: FieldRef<'Session', 'String'>;
    readonly tokenHash: FieldRef<'Session', 'String'>;
    readonly expiresAt: FieldRef<'Session', 'DateTime'>;
    readonly createdAt: FieldRef<'Session', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  };

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        email?: boolean;
        name?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        passwordCredential?: boolean | User$passwordCredentialArgs<ExtArgs>;
        sessions?: boolean | User$sessionsArgs<ExtArgs>;
        memberships?: boolean | User$membershipsArgs<ExtArgs>;
        comments?: boolean | User$commentsArgs<ExtArgs>;
        historyEvents?: boolean | User$historyEventsArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      name?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'email' | 'name' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['user']
    >;
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordCredential?: boolean | User$passwordCredentialArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    memberships?: boolean | User$membershipsArgs<ExtArgs>;
    comments?: boolean | User$commentsArgs<ExtArgs>;
    historyEvents?: boolean | User$historyEventsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {
      passwordCredential: Prisma.$PasswordCredentialPayload<ExtArgs> | null;
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      memberships: Prisma.$BoardMemberPayload<ExtArgs>[];
      comments: Prisma.$CommentPayload<ExtArgs>[];
      historyEvents: Prisma.$TaskHistoryEventPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    passwordCredential<T extends User$passwordCredentialArgs<ExtArgs> = {}>(
      args?: Subset<T, User$passwordCredentialArgs<ExtArgs>>,
    ): Prisma__PasswordCredentialClient<
      $Result.GetResult<
        Prisma.$PasswordCredentialPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$membershipsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    comments<T extends User$commentsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$commentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    historyEvents<T extends User$historyEventsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$historyEventsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$TaskHistoryEventPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Users.
       */
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.passwordCredential
   */
  export type User$passwordCredentialArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PasswordCredential
     */
    select?: PasswordCredentialSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordCredential
     */
    omit?: PasswordCredentialOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordCredentialInclude<ExtArgs> | null;
    where?: PasswordCredentialWhereInput;
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.memberships
   */
  export type User$membershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    where?: BoardMemberWhereInput;
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    cursor?: BoardMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BoardMemberScalarFieldEnum | BoardMemberScalarFieldEnum[];
  };

  /**
   * User.comments
   */
  export type User$commentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    where?: CommentWhereInput;
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    cursor?: CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[];
  };

  /**
   * User.historyEvents
   */
  export type User$historyEventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    where?: TaskHistoryEventWhereInput;
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    cursor?: TaskHistoryEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TaskHistoryEventScalarFieldEnum | TaskHistoryEventScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
    };

  /**
   * Model Board
   */

  export type AggregateBoard = {
    _count: BoardCountAggregateOutputType | null;
    _min: BoardMinAggregateOutputType | null;
    _max: BoardMaxAggregateOutputType | null;
  };

  export type BoardMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BoardMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BoardCountAggregateOutputType = {
    id: number;
    title: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type BoardMinAggregateInputType = {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BoardMaxAggregateInputType = {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BoardCountAggregateInputType = {
    id?: true;
    title?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type BoardAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Board to aggregate.
     */
    where?: BoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: BoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Boards
     **/
    _count?: true | BoardCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: BoardMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: BoardMaxAggregateInputType;
  };

  export type GetBoardAggregateType<T extends BoardAggregateArgs> = {
    [P in keyof T & keyof AggregateBoard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoard[P]>
      : GetScalarType<T[P], AggregateBoard[P]>;
  };

  export type BoardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: BoardWhereInput;
      orderBy?: BoardOrderByWithAggregationInput | BoardOrderByWithAggregationInput[];
      by: BoardScalarFieldEnum[] | BoardScalarFieldEnum;
      having?: BoardScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: BoardCountAggregateInputType | true;
      _min?: BoardMinAggregateInputType;
      _max?: BoardMaxAggregateInputType;
    };

  export type BoardGroupByOutputType = {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    _count: BoardCountAggregateOutputType | null;
    _min: BoardMinAggregateOutputType | null;
    _max: BoardMaxAggregateOutputType | null;
  };

  type GetBoardGroupByPayload<T extends BoardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardGroupByOutputType, T['by']> & {
        [P in keyof T & keyof BoardGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], BoardGroupByOutputType[P]>
          : GetScalarType<T[P], BoardGroupByOutputType[P]>;
      }
    >
  >;

  export type BoardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        title?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        members?: boolean | Board$membersArgs<ExtArgs>;
        columns?: boolean | Board$columnsArgs<ExtArgs>;
        _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['board']
    >;

  export type BoardSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['board']
  >;

  export type BoardSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['board']
  >;

  export type BoardSelectScalar = {
    id?: boolean;
    title?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type BoardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<'id' | 'title' | 'createdAt' | 'updatedAt', ExtArgs['result']['board']>;
  export type BoardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Board$membersArgs<ExtArgs>;
    columns?: boolean | Board$columnsArgs<ExtArgs>;
    _count?: boolean | BoardCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type BoardIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type BoardIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $BoardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Board';
    objects: {
      members: Prisma.$BoardMemberPayload<ExtArgs>[];
      columns: Prisma.$ColumnPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['board']
    >;
    composites: {};
  };

  type BoardGetPayload<S extends boolean | null | undefined | BoardDefaultArgs> = $Result.GetResult<
    Prisma.$BoardPayload,
    S
  >;

  type BoardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    BoardFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: BoardCountAggregateInputType | true;
  };

  export interface BoardDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Board']; meta: { name: 'Board' } };
    /**
     * Find zero or one Board that matches the filter.
     * @param {BoardFindUniqueArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardFindUniqueArgs>(
      args: SelectSubset<T, BoardFindUniqueArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Board that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardFindUniqueOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardFindUniqueOrThrowArgs>(
      args: SelectSubset<T, BoardFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Board that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardFindFirstArgs>(
      args?: SelectSubset<T, BoardFindFirstArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Board that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindFirstOrThrowArgs} args - Arguments to find a Board
     * @example
     * // Get one Board
     * const board = await prisma.board.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BoardFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Boards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boards
     * const boards = await prisma.board.findMany()
     *
     * // Get first 10 Boards
     * const boards = await prisma.board.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const boardWithIdOnly = await prisma.board.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BoardFindManyArgs>(
      args?: SelectSubset<T, BoardFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Board.
     * @param {BoardCreateArgs} args - Arguments to create a Board.
     * @example
     * // Create one Board
     * const Board = await prisma.board.create({
     *   data: {
     *     // ... data to create a Board
     *   }
     * })
     *
     */
    create<T extends BoardCreateArgs>(
      args: SelectSubset<T, BoardCreateArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Boards.
     * @param {BoardCreateManyArgs} args - Arguments to create many Boards.
     * @example
     * // Create many Boards
     * const board = await prisma.board.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BoardCreateManyArgs>(
      args?: SelectSubset<T, BoardCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Boards and returns the data saved in the database.
     * @param {BoardCreateManyAndReturnArgs} args - Arguments to create many Boards.
     * @example
     * // Create many Boards
     * const board = await prisma.board.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Boards and only return the `id`
     * const boardWithIdOnly = await prisma.board.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BoardCreateManyAndReturnArgs>(
      args?: SelectSubset<T, BoardCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Board.
     * @param {BoardDeleteArgs} args - Arguments to delete one Board.
     * @example
     * // Delete one Board
     * const Board = await prisma.board.delete({
     *   where: {
     *     // ... filter to delete one Board
     *   }
     * })
     *
     */
    delete<T extends BoardDeleteArgs>(
      args: SelectSubset<T, BoardDeleteArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Board.
     * @param {BoardUpdateArgs} args - Arguments to update one Board.
     * @example
     * // Update one Board
     * const board = await prisma.board.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BoardUpdateArgs>(
      args: SelectSubset<T, BoardUpdateArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Boards.
     * @param {BoardDeleteManyArgs} args - Arguments to filter Boards to delete.
     * @example
     * // Delete a few Boards
     * const { count } = await prisma.board.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BoardDeleteManyArgs>(
      args?: SelectSubset<T, BoardDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BoardUpdateManyArgs>(
      args: SelectSubset<T, BoardUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Boards and returns the data updated in the database.
     * @param {BoardUpdateManyAndReturnArgs} args - Arguments to update many Boards.
     * @example
     * // Update many Boards
     * const board = await prisma.board.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Boards and only return the `id`
     * const boardWithIdOnly = await prisma.board.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends BoardUpdateManyAndReturnArgs>(
      args: SelectSubset<T, BoardUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Board.
     * @param {BoardUpsertArgs} args - Arguments to update or create a Board.
     * @example
     * // Update or create a Board
     * const board = await prisma.board.upsert({
     *   create: {
     *     // ... data to create a Board
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Board we want to update
     *   }
     * })
     */
    upsert<T extends BoardUpsertArgs>(
      args: SelectSubset<T, BoardUpsertArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Boards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardCountArgs} args - Arguments to filter Boards to count.
     * @example
     * // Count the number of Boards
     * const count = await prisma.board.count({
     *   where: {
     *     // ... the filter for the Boards we want to count
     *   }
     * })
     **/
    count<T extends BoardCountArgs>(
      args?: Subset<T, BoardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends BoardAggregateArgs>(
      args: Subset<T, BoardAggregateArgs>,
    ): Prisma.PrismaPromise<GetBoardAggregateType<T>>;

    /**
     * Group by Board.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends BoardGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: BoardGroupByArgs['orderBy'] }
        : { orderBy?: BoardGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, BoardGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetBoardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Board model
     */
    readonly fields: BoardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Board.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    members<T extends Board$membersArgs<ExtArgs> = {}>(
      args?: Subset<T, Board$membersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    columns<T extends Board$columnsArgs<ExtArgs> = {}>(
      args?: Subset<T, Board$columnsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Board model
   */
  interface BoardFieldRefs {
    readonly id: FieldRef<'Board', 'String'>;
    readonly title: FieldRef<'Board', 'String'>;
    readonly createdAt: FieldRef<'Board', 'DateTime'>;
    readonly updatedAt: FieldRef<'Board', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Board findUnique
   */
  export type BoardFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null;
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput;
  };

  /**
   * Board findUniqueOrThrow
   */
  export type BoardFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null;
    /**
     * Filter, which Board to fetch.
     */
    where: BoardWhereUniqueInput;
  };

  /**
   * Board findFirst
   */
  export type BoardFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null;
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[];
  };

  /**
   * Board findFirstOrThrow
   */
  export type BoardFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null;
    /**
     * Filter, which Board to fetch.
     */
    where?: BoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Boards.
     */
    cursor?: BoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[];
  };

  /**
   * Board findMany
   */
  export type BoardFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardInclude<ExtArgs> | null;
    /**
     * Filter, which Boards to fetch.
     */
    where?: BoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boards to fetch.
     */
    orderBy?: BoardOrderByWithRelationInput | BoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Boards.
     */
    cursor?: BoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boards.
     */
    distinct?: BoardScalarFieldEnum | BoardScalarFieldEnum[];
  };

  /**
   * Board create
   */
  export type BoardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Board
       */
      select?: BoardSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Board
       */
      omit?: BoardOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: BoardInclude<ExtArgs> | null;
      /**
       * The data needed to create a Board.
       */
      data: XOR<BoardCreateInput, BoardUncheckedCreateInput>;
    };

  /**
   * Board createMany
   */
  export type BoardCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Boards.
     */
    data: BoardCreateManyInput | BoardCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Board createManyAndReturn
   */
  export type BoardCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * The data used to create many Boards.
     */
    data: BoardCreateManyInput | BoardCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Board update
   */
  export type BoardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Board
       */
      select?: BoardSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Board
       */
      omit?: BoardOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: BoardInclude<ExtArgs> | null;
      /**
       * The data needed to update a Board.
       */
      data: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>;
      /**
       * Choose, which Board to update.
       */
      where: BoardWhereUniqueInput;
    };

  /**
   * Board updateMany
   */
  export type BoardUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Boards.
     */
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>;
    /**
     * Filter which Boards to update
     */
    where?: BoardWhereInput;
    /**
     * Limit how many Boards to update.
     */
    limit?: number;
  };

  /**
   * Board updateManyAndReturn
   */
  export type BoardUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Board
     */
    select?: BoardSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Board
     */
    omit?: BoardOmit<ExtArgs> | null;
    /**
     * The data used to update Boards.
     */
    data: XOR<BoardUpdateManyMutationInput, BoardUncheckedUpdateManyInput>;
    /**
     * Filter which Boards to update
     */
    where?: BoardWhereInput;
    /**
     * Limit how many Boards to update.
     */
    limit?: number;
  };

  /**
   * Board upsert
   */
  export type BoardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Board
       */
      select?: BoardSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Board
       */
      omit?: BoardOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: BoardInclude<ExtArgs> | null;
      /**
       * The filter to search for the Board to update in case it exists.
       */
      where: BoardWhereUniqueInput;
      /**
       * In case the Board found by the `where` argument doesn't exist, create a new Board with this data.
       */
      create: XOR<BoardCreateInput, BoardUncheckedCreateInput>;
      /**
       * In case the Board was found with the provided `where` argument, update it with this data.
       */
      update: XOR<BoardUpdateInput, BoardUncheckedUpdateInput>;
    };

  /**
   * Board delete
   */
  export type BoardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Board
       */
      select?: BoardSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Board
       */
      omit?: BoardOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: BoardInclude<ExtArgs> | null;
      /**
       * Filter which Board to delete.
       */
      where: BoardWhereUniqueInput;
    };

  /**
   * Board deleteMany
   */
  export type BoardDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Boards to delete
     */
    where?: BoardWhereInput;
    /**
     * Limit how many Boards to delete.
     */
    limit?: number;
  };

  /**
   * Board.members
   */
  export type Board$membersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    where?: BoardMemberWhereInput;
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    cursor?: BoardMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BoardMemberScalarFieldEnum | BoardMemberScalarFieldEnum[];
  };

  /**
   * Board.columns
   */
  export type Board$columnsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    where?: ColumnWhereInput;
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[];
    cursor?: ColumnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[];
  };

  /**
   * Board without action
   */
  export type BoardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Board
       */
      select?: BoardSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Board
       */
      omit?: BoardOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: BoardInclude<ExtArgs> | null;
    };

  /**
   * Model BoardMember
   */

  export type AggregateBoardMember = {
    _count: BoardMemberCountAggregateOutputType | null;
    _min: BoardMemberMinAggregateOutputType | null;
    _max: BoardMemberMaxAggregateOutputType | null;
  };

  export type BoardMemberMinAggregateOutputType = {
    id: string | null;
    boardId: string | null;
    userId: string | null;
    role: $Enums.BoardMemberRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BoardMemberMaxAggregateOutputType = {
    id: string | null;
    boardId: string | null;
    userId: string | null;
    role: $Enums.BoardMemberRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type BoardMemberCountAggregateOutputType = {
    id: number;
    boardId: number;
    userId: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type BoardMemberMinAggregateInputType = {
    id?: true;
    boardId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BoardMemberMaxAggregateInputType = {
    id?: true;
    boardId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type BoardMemberCountAggregateInputType = {
    id?: true;
    boardId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type BoardMemberAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which BoardMember to aggregate.
     */
    where?: BoardMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoardMembers to fetch.
     */
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: BoardMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoardMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoardMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned BoardMembers
     **/
    _count?: true | BoardMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: BoardMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: BoardMemberMaxAggregateInputType;
  };

  export type GetBoardMemberAggregateType<T extends BoardMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateBoardMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoardMember[P]>
      : GetScalarType<T[P], AggregateBoardMember[P]>;
  };

  export type BoardMemberGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: BoardMemberWhereInput;
    orderBy?: BoardMemberOrderByWithAggregationInput | BoardMemberOrderByWithAggregationInput[];
    by: BoardMemberScalarFieldEnum[] | BoardMemberScalarFieldEnum;
    having?: BoardMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BoardMemberCountAggregateInputType | true;
    _min?: BoardMemberMinAggregateInputType;
    _max?: BoardMemberMaxAggregateInputType;
  };

  export type BoardMemberGroupByOutputType = {
    id: string;
    boardId: string;
    userId: string;
    role: $Enums.BoardMemberRole;
    createdAt: Date;
    updatedAt: Date;
    _count: BoardMemberCountAggregateOutputType | null;
    _min: BoardMemberMinAggregateOutputType | null;
    _max: BoardMemberMaxAggregateOutputType | null;
  };

  type GetBoardMemberGroupByPayload<T extends BoardMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoardMemberGroupByOutputType, T['by']> & {
        [P in keyof T & keyof BoardMemberGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], BoardMemberGroupByOutputType[P]>
          : GetScalarType<T[P], BoardMemberGroupByOutputType[P]>;
      }
    >
  >;

  export type BoardMemberSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      boardId?: boolean;
      userId?: boolean;
      role?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      board?: boolean | BoardDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['boardMember']
  >;

  export type BoardMemberSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      boardId?: boolean;
      userId?: boolean;
      role?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      board?: boolean | BoardDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['boardMember']
  >;

  export type BoardMemberSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      boardId?: boolean;
      userId?: boolean;
      role?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      board?: boolean | BoardDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['boardMember']
  >;

  export type BoardMemberSelectScalar = {
    id?: boolean;
    boardId?: boolean;
    userId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type BoardMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'boardId' | 'userId' | 'role' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['boardMember']
    >;
  export type BoardMemberInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type BoardMemberIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type BoardMemberIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $BoardMemberPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'BoardMember';
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        boardId: string;
        userId: string;
        role: $Enums.BoardMemberRole;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['boardMember']
    >;
    composites: {};
  };

  type BoardMemberGetPayload<S extends boolean | null | undefined | BoardMemberDefaultArgs> =
    $Result.GetResult<Prisma.$BoardMemberPayload, S>;

  type BoardMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoardMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoardMemberCountAggregateInputType | true;
    };

  export interface BoardMemberDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['BoardMember'];
      meta: { name: 'BoardMember' };
    };
    /**
     * Find zero or one BoardMember that matches the filter.
     * @param {BoardMemberFindUniqueArgs} args - Arguments to find a BoardMember
     * @example
     * // Get one BoardMember
     * const boardMember = await prisma.boardMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoardMemberFindUniqueArgs>(
      args: SelectSubset<T, BoardMemberFindUniqueArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one BoardMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoardMemberFindUniqueOrThrowArgs} args - Arguments to find a BoardMember
     * @example
     * // Get one BoardMember
     * const boardMember = await prisma.boardMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoardMemberFindUniqueOrThrowArgs>(
      args: SelectSubset<T, BoardMemberFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first BoardMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberFindFirstArgs} args - Arguments to find a BoardMember
     * @example
     * // Get one BoardMember
     * const boardMember = await prisma.boardMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoardMemberFindFirstArgs>(
      args?: SelectSubset<T, BoardMemberFindFirstArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first BoardMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberFindFirstOrThrowArgs} args - Arguments to find a BoardMember
     * @example
     * // Get one BoardMember
     * const boardMember = await prisma.boardMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoardMemberFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BoardMemberFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more BoardMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoardMembers
     * const boardMembers = await prisma.boardMember.findMany()
     *
     * // Get first 10 BoardMembers
     * const boardMembers = await prisma.boardMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const boardMemberWithIdOnly = await prisma.boardMember.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BoardMemberFindManyArgs>(
      args?: SelectSubset<T, BoardMemberFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a BoardMember.
     * @param {BoardMemberCreateArgs} args - Arguments to create a BoardMember.
     * @example
     * // Create one BoardMember
     * const BoardMember = await prisma.boardMember.create({
     *   data: {
     *     // ... data to create a BoardMember
     *   }
     * })
     *
     */
    create<T extends BoardMemberCreateArgs>(
      args: SelectSubset<T, BoardMemberCreateArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many BoardMembers.
     * @param {BoardMemberCreateManyArgs} args - Arguments to create many BoardMembers.
     * @example
     * // Create many BoardMembers
     * const boardMember = await prisma.boardMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BoardMemberCreateManyArgs>(
      args?: SelectSubset<T, BoardMemberCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many BoardMembers and returns the data saved in the database.
     * @param {BoardMemberCreateManyAndReturnArgs} args - Arguments to create many BoardMembers.
     * @example
     * // Create many BoardMembers
     * const boardMember = await prisma.boardMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many BoardMembers and only return the `id`
     * const boardMemberWithIdOnly = await prisma.boardMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BoardMemberCreateManyAndReturnArgs>(
      args?: SelectSubset<T, BoardMemberCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a BoardMember.
     * @param {BoardMemberDeleteArgs} args - Arguments to delete one BoardMember.
     * @example
     * // Delete one BoardMember
     * const BoardMember = await prisma.boardMember.delete({
     *   where: {
     *     // ... filter to delete one BoardMember
     *   }
     * })
     *
     */
    delete<T extends BoardMemberDeleteArgs>(
      args: SelectSubset<T, BoardMemberDeleteArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one BoardMember.
     * @param {BoardMemberUpdateArgs} args - Arguments to update one BoardMember.
     * @example
     * // Update one BoardMember
     * const boardMember = await prisma.boardMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BoardMemberUpdateArgs>(
      args: SelectSubset<T, BoardMemberUpdateArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more BoardMembers.
     * @param {BoardMemberDeleteManyArgs} args - Arguments to filter BoardMembers to delete.
     * @example
     * // Delete a few BoardMembers
     * const { count } = await prisma.boardMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BoardMemberDeleteManyArgs>(
      args?: SelectSubset<T, BoardMemberDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more BoardMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoardMembers
     * const boardMember = await prisma.boardMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BoardMemberUpdateManyArgs>(
      args: SelectSubset<T, BoardMemberUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more BoardMembers and returns the data updated in the database.
     * @param {BoardMemberUpdateManyAndReturnArgs} args - Arguments to update many BoardMembers.
     * @example
     * // Update many BoardMembers
     * const boardMember = await prisma.boardMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more BoardMembers and only return the `id`
     * const boardMemberWithIdOnly = await prisma.boardMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends BoardMemberUpdateManyAndReturnArgs>(
      args: SelectSubset<T, BoardMemberUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$BoardMemberPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one BoardMember.
     * @param {BoardMemberUpsertArgs} args - Arguments to update or create a BoardMember.
     * @example
     * // Update or create a BoardMember
     * const boardMember = await prisma.boardMember.upsert({
     *   create: {
     *     // ... data to create a BoardMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoardMember we want to update
     *   }
     * })
     */
    upsert<T extends BoardMemberUpsertArgs>(
      args: SelectSubset<T, BoardMemberUpsertArgs<ExtArgs>>,
    ): Prisma__BoardMemberClient<
      $Result.GetResult<Prisma.$BoardMemberPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of BoardMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberCountArgs} args - Arguments to filter BoardMembers to count.
     * @example
     * // Count the number of BoardMembers
     * const count = await prisma.boardMember.count({
     *   where: {
     *     // ... the filter for the BoardMembers we want to count
     *   }
     * })
     **/
    count<T extends BoardMemberCountArgs>(
      args?: Subset<T, BoardMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoardMemberCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a BoardMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends BoardMemberAggregateArgs>(
      args: Subset<T, BoardMemberAggregateArgs>,
    ): Prisma.PrismaPromise<GetBoardMemberAggregateType<T>>;

    /**
     * Group by BoardMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoardMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends BoardMemberGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: BoardMemberGroupByArgs['orderBy'] }
        : { orderBy?: BoardMemberGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, BoardMemberGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetBoardMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the BoardMember model
     */
    readonly fields: BoardMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BoardMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoardMemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, BoardDefaultArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      | $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the BoardMember model
   */
  interface BoardMemberFieldRefs {
    readonly id: FieldRef<'BoardMember', 'String'>;
    readonly boardId: FieldRef<'BoardMember', 'String'>;
    readonly userId: FieldRef<'BoardMember', 'String'>;
    readonly role: FieldRef<'BoardMember', 'BoardMemberRole'>;
    readonly createdAt: FieldRef<'BoardMember', 'DateTime'>;
    readonly updatedAt: FieldRef<'BoardMember', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * BoardMember findUnique
   */
  export type BoardMemberFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter, which BoardMember to fetch.
     */
    where: BoardMemberWhereUniqueInput;
  };

  /**
   * BoardMember findUniqueOrThrow
   */
  export type BoardMemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter, which BoardMember to fetch.
     */
    where: BoardMemberWhereUniqueInput;
  };

  /**
   * BoardMember findFirst
   */
  export type BoardMemberFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter, which BoardMember to fetch.
     */
    where?: BoardMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoardMembers to fetch.
     */
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BoardMembers.
     */
    cursor?: BoardMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoardMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoardMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoardMembers.
     */
    distinct?: BoardMemberScalarFieldEnum | BoardMemberScalarFieldEnum[];
  };

  /**
   * BoardMember findFirstOrThrow
   */
  export type BoardMemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter, which BoardMember to fetch.
     */
    where?: BoardMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoardMembers to fetch.
     */
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BoardMembers.
     */
    cursor?: BoardMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoardMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoardMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoardMembers.
     */
    distinct?: BoardMemberScalarFieldEnum | BoardMemberScalarFieldEnum[];
  };

  /**
   * BoardMember findMany
   */
  export type BoardMemberFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter, which BoardMembers to fetch.
     */
    where?: BoardMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoardMembers to fetch.
     */
    orderBy?: BoardMemberOrderByWithRelationInput | BoardMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing BoardMembers.
     */
    cursor?: BoardMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoardMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoardMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoardMembers.
     */
    distinct?: BoardMemberScalarFieldEnum | BoardMemberScalarFieldEnum[];
  };

  /**
   * BoardMember create
   */
  export type BoardMemberCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * The data needed to create a BoardMember.
     */
    data: XOR<BoardMemberCreateInput, BoardMemberUncheckedCreateInput>;
  };

  /**
   * BoardMember createMany
   */
  export type BoardMemberCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many BoardMembers.
     */
    data: BoardMemberCreateManyInput | BoardMemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * BoardMember createManyAndReturn
   */
  export type BoardMemberCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many BoardMembers.
     */
    data: BoardMemberCreateManyInput | BoardMemberCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * BoardMember update
   */
  export type BoardMemberUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * The data needed to update a BoardMember.
     */
    data: XOR<BoardMemberUpdateInput, BoardMemberUncheckedUpdateInput>;
    /**
     * Choose, which BoardMember to update.
     */
    where: BoardMemberWhereUniqueInput;
  };

  /**
   * BoardMember updateMany
   */
  export type BoardMemberUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update BoardMembers.
     */
    data: XOR<BoardMemberUpdateManyMutationInput, BoardMemberUncheckedUpdateManyInput>;
    /**
     * Filter which BoardMembers to update
     */
    where?: BoardMemberWhereInput;
    /**
     * Limit how many BoardMembers to update.
     */
    limit?: number;
  };

  /**
   * BoardMember updateManyAndReturn
   */
  export type BoardMemberUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * The data used to update BoardMembers.
     */
    data: XOR<BoardMemberUpdateManyMutationInput, BoardMemberUncheckedUpdateManyInput>;
    /**
     * Filter which BoardMembers to update
     */
    where?: BoardMemberWhereInput;
    /**
     * Limit how many BoardMembers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * BoardMember upsert
   */
  export type BoardMemberUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * The filter to search for the BoardMember to update in case it exists.
     */
    where: BoardMemberWhereUniqueInput;
    /**
     * In case the BoardMember found by the `where` argument doesn't exist, create a new BoardMember with this data.
     */
    create: XOR<BoardMemberCreateInput, BoardMemberUncheckedCreateInput>;
    /**
     * In case the BoardMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoardMemberUpdateInput, BoardMemberUncheckedUpdateInput>;
  };

  /**
   * BoardMember delete
   */
  export type BoardMemberDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
    /**
     * Filter which BoardMember to delete.
     */
    where: BoardMemberWhereUniqueInput;
  };

  /**
   * BoardMember deleteMany
   */
  export type BoardMemberDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which BoardMembers to delete
     */
    where?: BoardMemberWhereInput;
    /**
     * Limit how many BoardMembers to delete.
     */
    limit?: number;
  };

  /**
   * BoardMember without action
   */
  export type BoardMemberDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the BoardMember
     */
    select?: BoardMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoardMember
     */
    omit?: BoardMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoardMemberInclude<ExtArgs> | null;
  };

  /**
   * Model Column
   */

  export type AggregateColumn = {
    _count: ColumnCountAggregateOutputType | null;
    _avg: ColumnAvgAggregateOutputType | null;
    _sum: ColumnSumAggregateOutputType | null;
    _min: ColumnMinAggregateOutputType | null;
    _max: ColumnMaxAggregateOutputType | null;
  };

  export type ColumnAvgAggregateOutputType = {
    position: number | null;
  };

  export type ColumnSumAggregateOutputType = {
    position: number | null;
  };

  export type ColumnMinAggregateOutputType = {
    id: string | null;
    boardId: string | null;
    title: string | null;
    position: number | null;
    isCompleted: boolean | null;
    isArchive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ColumnMaxAggregateOutputType = {
    id: string | null;
    boardId: string | null;
    title: string | null;
    position: number | null;
    isCompleted: boolean | null;
    isArchive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ColumnCountAggregateOutputType = {
    id: number;
    boardId: number;
    title: number;
    position: number;
    isCompleted: number;
    isArchive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ColumnAvgAggregateInputType = {
    position?: true;
  };

  export type ColumnSumAggregateInputType = {
    position?: true;
  };

  export type ColumnMinAggregateInputType = {
    id?: true;
    boardId?: true;
    title?: true;
    position?: true;
    isCompleted?: true;
    isArchive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ColumnMaxAggregateInputType = {
    id?: true;
    boardId?: true;
    title?: true;
    position?: true;
    isCompleted?: true;
    isArchive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ColumnCountAggregateInputType = {
    id?: true;
    boardId?: true;
    title?: true;
    position?: true;
    isCompleted?: true;
    isArchive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ColumnAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Column to aggregate.
     */
    where?: ColumnWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ColumnWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Columns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Columns
     **/
    _count?: true | ColumnCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ColumnAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ColumnSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ColumnMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ColumnMaxAggregateInputType;
  };

  export type GetColumnAggregateType<T extends ColumnAggregateArgs> = {
    [P in keyof T & keyof AggregateColumn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColumn[P]>
      : GetScalarType<T[P], AggregateColumn[P]>;
  };

  export type ColumnGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ColumnWhereInput;
    orderBy?: ColumnOrderByWithAggregationInput | ColumnOrderByWithAggregationInput[];
    by: ColumnScalarFieldEnum[] | ColumnScalarFieldEnum;
    having?: ColumnScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ColumnCountAggregateInputType | true;
    _avg?: ColumnAvgAggregateInputType;
    _sum?: ColumnSumAggregateInputType;
    _min?: ColumnMinAggregateInputType;
    _max?: ColumnMaxAggregateInputType;
  };

  export type ColumnGroupByOutputType = {
    id: string;
    boardId: string;
    title: string;
    position: number;
    isCompleted: boolean;
    isArchive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ColumnCountAggregateOutputType | null;
    _avg: ColumnAvgAggregateOutputType | null;
    _sum: ColumnSumAggregateOutputType | null;
    _min: ColumnMinAggregateOutputType | null;
    _max: ColumnMaxAggregateOutputType | null;
  };

  type GetColumnGroupByPayload<T extends ColumnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColumnGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ColumnGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ColumnGroupByOutputType[P]>
          : GetScalarType<T[P], ColumnGroupByOutputType[P]>;
      }
    >
  >;

  export type ColumnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        boardId?: boolean;
        title?: boolean;
        position?: boolean;
        isCompleted?: boolean;
        isArchive?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        board?: boolean | BoardDefaultArgs<ExtArgs>;
        tasks?: boolean | Column$tasksArgs<ExtArgs>;
        _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['column']
    >;

  export type ColumnSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      boardId?: boolean;
      title?: boolean;
      position?: boolean;
      isCompleted?: boolean;
      isArchive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      board?: boolean | BoardDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['column']
  >;

  export type ColumnSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      boardId?: boolean;
      title?: boolean;
      position?: boolean;
      isCompleted?: boolean;
      isArchive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      board?: boolean | BoardDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['column']
  >;

  export type ColumnSelectScalar = {
    id?: boolean;
    boardId?: boolean;
    title?: boolean;
    position?: boolean;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ColumnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'boardId'
      | 'title'
      | 'position'
      | 'isCompleted'
      | 'isArchive'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['column']
    >;
  export type ColumnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
    tasks?: boolean | Column$tasksArgs<ExtArgs>;
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ColumnIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
  };
  export type ColumnIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    board?: boolean | BoardDefaultArgs<ExtArgs>;
  };

  export type $ColumnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Column';
    objects: {
      board: Prisma.$BoardPayload<ExtArgs>;
      tasks: Prisma.$TaskPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        boardId: string;
        title: string;
        position: number;
        isCompleted: boolean;
        isArchive: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['column']
    >;
    composites: {};
  };

  type ColumnGetPayload<S extends boolean | null | undefined | ColumnDefaultArgs> =
    $Result.GetResult<Prisma.$ColumnPayload, S>;

  type ColumnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ColumnFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ColumnCountAggregateInputType | true;
  };

  export interface ColumnDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Column']; meta: { name: 'Column' } };
    /**
     * Find zero or one Column that matches the filter.
     * @param {ColumnFindUniqueArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColumnFindUniqueArgs>(
      args: SelectSubset<T, ColumnFindUniqueArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Column that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColumnFindUniqueOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColumnFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ColumnFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Column that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColumnFindFirstArgs>(
      args?: SelectSubset<T, ColumnFindFirstArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Column that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColumnFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ColumnFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Columns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Columns
     * const columns = await prisma.column.findMany()
     *
     * // Get first 10 Columns
     * const columns = await prisma.column.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const columnWithIdOnly = await prisma.column.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ColumnFindManyArgs>(
      args?: SelectSubset<T, ColumnFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Column.
     * @param {ColumnCreateArgs} args - Arguments to create a Column.
     * @example
     * // Create one Column
     * const Column = await prisma.column.create({
     *   data: {
     *     // ... data to create a Column
     *   }
     * })
     *
     */
    create<T extends ColumnCreateArgs>(
      args: SelectSubset<T, ColumnCreateArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Columns.
     * @param {ColumnCreateManyArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ColumnCreateManyArgs>(
      args?: SelectSubset<T, ColumnCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Columns and returns the data saved in the database.
     * @param {ColumnCreateManyAndReturnArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ColumnCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ColumnCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Column.
     * @param {ColumnDeleteArgs} args - Arguments to delete one Column.
     * @example
     * // Delete one Column
     * const Column = await prisma.column.delete({
     *   where: {
     *     // ... filter to delete one Column
     *   }
     * })
     *
     */
    delete<T extends ColumnDeleteArgs>(
      args: SelectSubset<T, ColumnDeleteArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Column.
     * @param {ColumnUpdateArgs} args - Arguments to update one Column.
     * @example
     * // Update one Column
     * const column = await prisma.column.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ColumnUpdateArgs>(
      args: SelectSubset<T, ColumnUpdateArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Columns.
     * @param {ColumnDeleteManyArgs} args - Arguments to filter Columns to delete.
     * @example
     * // Delete a few Columns
     * const { count } = await prisma.column.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ColumnDeleteManyArgs>(
      args?: SelectSubset<T, ColumnDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ColumnUpdateManyArgs>(
      args: SelectSubset<T, ColumnUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Columns and returns the data updated in the database.
     * @param {ColumnUpdateManyAndReturnArgs} args - Arguments to update many Columns.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ColumnUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ColumnUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Column.
     * @param {ColumnUpsertArgs} args - Arguments to update or create a Column.
     * @example
     * // Update or create a Column
     * const column = await prisma.column.upsert({
     *   create: {
     *     // ... data to create a Column
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Column we want to update
     *   }
     * })
     */
    upsert<T extends ColumnUpsertArgs>(
      args: SelectSubset<T, ColumnUpsertArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnCountArgs} args - Arguments to filter Columns to count.
     * @example
     * // Count the number of Columns
     * const count = await prisma.column.count({
     *   where: {
     *     // ... the filter for the Columns we want to count
     *   }
     * })
     **/
    count<T extends ColumnCountArgs>(
      args?: Subset<T, ColumnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColumnCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ColumnAggregateArgs>(
      args: Subset<T, ColumnAggregateArgs>,
    ): Prisma.PrismaPromise<GetColumnAggregateType<T>>;

    /**
     * Group by Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ColumnGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: ColumnGroupByArgs['orderBy'] }
        : { orderBy?: ColumnGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, ColumnGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Column model
     */
    readonly fields: ColumnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Column.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColumnClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    board<T extends BoardDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, BoardDefaultArgs<ExtArgs>>,
    ): Prisma__BoardClient<
      | $Result.GetResult<Prisma.$BoardPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    tasks<T extends Column$tasksArgs<ExtArgs> = {}>(
      args?: Subset<T, Column$tasksArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Column model
   */
  interface ColumnFieldRefs {
    readonly id: FieldRef<'Column', 'String'>;
    readonly boardId: FieldRef<'Column', 'String'>;
    readonly title: FieldRef<'Column', 'String'>;
    readonly position: FieldRef<'Column', 'Int'>;
    readonly isCompleted: FieldRef<'Column', 'Boolean'>;
    readonly isArchive: FieldRef<'Column', 'Boolean'>;
    readonly createdAt: FieldRef<'Column', 'DateTime'>;
    readonly updatedAt: FieldRef<'Column', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Column findUnique
   */
  export type ColumnFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput;
  };

  /**
   * Column findUniqueOrThrow
   */
  export type ColumnFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput;
  };

  /**
   * Column findFirst
   */
  export type ColumnFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Columns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[];
  };

  /**
   * Column findFirstOrThrow
   */
  export type ColumnFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Columns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[];
  };

  /**
   * Column findMany
   */
  export type ColumnFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
    /**
     * Filter, which Columns to fetch.
     */
    where?: ColumnWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Columns.
     */
    cursor?: ColumnWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Columns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[];
  };

  /**
   * Column create
   */
  export type ColumnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Column
       */
      select?: ColumnSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Column
       */
      omit?: ColumnOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ColumnInclude<ExtArgs> | null;
      /**
       * The data needed to create a Column.
       */
      data: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>;
    };

  /**
   * Column createMany
   */
  export type ColumnCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Column createManyAndReturn
   */
  export type ColumnCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Column update
   */
  export type ColumnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Column
       */
      select?: ColumnSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Column
       */
      omit?: ColumnOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ColumnInclude<ExtArgs> | null;
      /**
       * The data needed to update a Column.
       */
      data: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>;
      /**
       * Choose, which Column to update.
       */
      where: ColumnWhereUniqueInput;
    };

  /**
   * Column updateMany
   */
  export type ColumnUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>;
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput;
    /**
     * Limit how many Columns to update.
     */
    limit?: number;
  };

  /**
   * Column updateManyAndReturn
   */
  export type ColumnUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>;
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput;
    /**
     * Limit how many Columns to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Column upsert
   */
  export type ColumnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Column
       */
      select?: ColumnSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Column
       */
      omit?: ColumnOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ColumnInclude<ExtArgs> | null;
      /**
       * The filter to search for the Column to update in case it exists.
       */
      where: ColumnWhereUniqueInput;
      /**
       * In case the Column found by the `where` argument doesn't exist, create a new Column with this data.
       */
      create: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>;
      /**
       * In case the Column was found with the provided `where` argument, update it with this data.
       */
      update: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>;
    };

  /**
   * Column delete
   */
  export type ColumnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Column
       */
      select?: ColumnSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Column
       */
      omit?: ColumnOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ColumnInclude<ExtArgs> | null;
      /**
       * Filter which Column to delete.
       */
      where: ColumnWhereUniqueInput;
    };

  /**
   * Column deleteMany
   */
  export type ColumnDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Columns to delete
     */
    where?: ColumnWhereInput;
    /**
     * Limit how many Columns to delete.
     */
    limit?: number;
  };

  /**
   * Column.tasks
   */
  export type Column$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Task
       */
      select?: TaskSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Task
       */
      omit?: TaskOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TaskInclude<ExtArgs> | null;
      where?: TaskWhereInput;
      orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[];
      cursor?: TaskWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[];
    };

  /**
   * Column without action
   */
  export type ColumnDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null;
  };

  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null;
    _avg: TaskAvgAggregateOutputType | null;
    _sum: TaskSumAggregateOutputType | null;
    _min: TaskMinAggregateOutputType | null;
    _max: TaskMaxAggregateOutputType | null;
  };

  export type TaskAvgAggregateOutputType = {
    position: number | null;
  };

  export type TaskSumAggregateOutputType = {
    position: number | null;
  };

  export type TaskMinAggregateOutputType = {
    id: string | null;
    columnId: string | null;
    title: string | null;
    description: string | null;
    priority: $Enums.TaskPriority | null;
    dueDate: Date | null;
    archivedAt: Date | null;
    position: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TaskMaxAggregateOutputType = {
    id: string | null;
    columnId: string | null;
    title: string | null;
    description: string | null;
    priority: $Enums.TaskPriority | null;
    dueDate: Date | null;
    archivedAt: Date | null;
    position: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type TaskCountAggregateOutputType = {
    id: number;
    columnId: number;
    title: number;
    description: number;
    priority: number;
    tags: number;
    dueDate: number;
    archivedAt: number;
    position: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type TaskAvgAggregateInputType = {
    position?: true;
  };

  export type TaskSumAggregateInputType = {
    position?: true;
  };

  export type TaskMinAggregateInputType = {
    id?: true;
    columnId?: true;
    title?: true;
    description?: true;
    priority?: true;
    dueDate?: true;
    archivedAt?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TaskMaxAggregateInputType = {
    id?: true;
    columnId?: true;
    title?: true;
    description?: true;
    priority?: true;
    dueDate?: true;
    archivedAt?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type TaskCountAggregateInputType = {
    id?: true;
    columnId?: true;
    title?: true;
    description?: true;
    priority?: true;
    tags?: true;
    dueDate?: true;
    archivedAt?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type TaskAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tasks
     **/
    _count?: true | TaskCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TaskAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TaskSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TaskMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TaskMaxAggregateInputType;
  };

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
    [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>;
  };

  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: TaskWhereInput;
      orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[];
      by: TaskScalarFieldEnum[] | TaskScalarFieldEnum;
      having?: TaskScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: TaskCountAggregateInputType | true;
      _avg?: TaskAvgAggregateInputType;
      _sum?: TaskSumAggregateInputType;
      _min?: TaskMinAggregateInputType;
      _max?: TaskMaxAggregateInputType;
    };

  export type TaskGroupByOutputType = {
    id: string;
    columnId: string;
    title: string;
    description: string;
    priority: $Enums.TaskPriority;
    tags: string[];
    dueDate: Date | null;
    archivedAt: Date | null;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    _count: TaskCountAggregateOutputType | null;
    _avg: TaskAvgAggregateOutputType | null;
    _sum: TaskSumAggregateOutputType | null;
    _min: TaskMinAggregateOutputType | null;
    _max: TaskMaxAggregateOutputType | null;
  };

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> & {
        [P in keyof T & keyof TaskGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
          : GetScalarType<T[P], TaskGroupByOutputType[P]>;
      }
    >
  >;

  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        columnId?: boolean;
        title?: boolean;
        description?: boolean;
        priority?: boolean;
        tags?: boolean;
        dueDate?: boolean;
        archivedAt?: boolean;
        position?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        column?: boolean | ColumnDefaultArgs<ExtArgs>;
        subtasks?: boolean | Task$subtasksArgs<ExtArgs>;
        comments?: boolean | Task$commentsArgs<ExtArgs>;
        historyEvents?: boolean | Task$historyEventsArgs<ExtArgs>;
        _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['task']
    >;

  export type TaskSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      columnId?: boolean;
      title?: boolean;
      description?: boolean;
      priority?: boolean;
      tags?: boolean;
      dueDate?: boolean;
      archivedAt?: boolean;
      position?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      column?: boolean | ColumnDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['task']
  >;

  export type TaskSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      columnId?: boolean;
      title?: boolean;
      description?: boolean;
      priority?: boolean;
      tags?: boolean;
      dueDate?: boolean;
      archivedAt?: boolean;
      position?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      column?: boolean | ColumnDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['task']
  >;

  export type TaskSelectScalar = {
    id?: boolean;
    columnId?: boolean;
    title?: boolean;
    description?: boolean;
    priority?: boolean;
    tags?: boolean;
    dueDate?: boolean;
    archivedAt?: boolean;
    position?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'columnId'
      | 'title'
      | 'description'
      | 'priority'
      | 'tags'
      | 'dueDate'
      | 'archivedAt'
      | 'position'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['task']
    >;
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    column?: boolean | ColumnDefaultArgs<ExtArgs>;
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>;
    comments?: boolean | Task$commentsArgs<ExtArgs>;
    historyEvents?: boolean | Task$historyEventsArgs<ExtArgs>;
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type TaskIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    column?: boolean | ColumnDefaultArgs<ExtArgs>;
  };
  export type TaskIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    column?: boolean | ColumnDefaultArgs<ExtArgs>;
  };

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Task';
    objects: {
      column: Prisma.$ColumnPayload<ExtArgs>;
      subtasks: Prisma.$SubtaskPayload<ExtArgs>[];
      comments: Prisma.$CommentPayload<ExtArgs>[];
      historyEvents: Prisma.$TaskHistoryEventPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        columnId: string;
        title: string;
        description: string;
        priority: $Enums.TaskPriority;
        tags: string[];
        dueDate: Date | null;
        archivedAt: Date | null;
        position: number;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['task']
    >;
    composites: {};
  };

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<
    Prisma.$TaskPayload,
    S
  >;

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    TaskFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: TaskCountAggregateInputType | true;
  };

  export interface TaskDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task']; meta: { name: 'Task' } };
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(
      args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(
      args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     *
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TaskFindManyArgs>(
      args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     *
     */
    create<T extends TaskCreateArgs>(
      args: SelectSubset<T, TaskCreateArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TaskCreateManyArgs>(
      args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     *
     */
    delete<T extends TaskDeleteArgs>(
      args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TaskUpdateArgs>(
      args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TaskDeleteManyArgs>(
      args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TaskUpdateManyArgs>(
      args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(
      args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
     **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TaskAggregateArgs>(
      args: Subset<T, TaskAggregateArgs>,
    ): Prisma.PrismaPromise<GetTaskAggregateType<T>>;

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Task model
     */
    readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    column<T extends ColumnDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ColumnDefaultArgs<ExtArgs>>,
    ): Prisma__ColumnClient<
      | $Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    subtasks<T extends Task$subtasksArgs<ExtArgs> = {}>(
      args?: Subset<T, Task$subtasksArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    comments<T extends Task$commentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Task$commentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    historyEvents<T extends Task$historyEventsArgs<ExtArgs> = {}>(
      args?: Subset<T, Task$historyEventsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$TaskHistoryEventPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<'Task', 'String'>;
    readonly columnId: FieldRef<'Task', 'String'>;
    readonly title: FieldRef<'Task', 'String'>;
    readonly description: FieldRef<'Task', 'String'>;
    readonly priority: FieldRef<'Task', 'TaskPriority'>;
    readonly tags: FieldRef<'Task', 'String[]'>;
    readonly dueDate: FieldRef<'Task', 'DateTime'>;
    readonly archivedAt: FieldRef<'Task', 'DateTime'>;
    readonly position: FieldRef<'Task', 'Int'>;
    readonly createdAt: FieldRef<'Task', 'DateTime'>;
    readonly updatedAt: FieldRef<'Task', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput;
  };

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput;
  };

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[];
  };

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[];
  };

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Task
       */
      select?: TaskSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Task
       */
      omit?: TaskOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TaskInclude<ExtArgs> | null;
      /**
       * Filter, which Tasks to fetch.
       */
      where?: TaskWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Tasks to fetch.
       */
      orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Tasks.
       */
      cursor?: TaskWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Tasks from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Tasks.
       */
      skip?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Tasks.
       */
      distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[];
    };

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>;
  };

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>;
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput;
  };

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>;
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput;
    /**
     * Limit how many Tasks to update.
     */
    limit?: number;
  };

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>;
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput;
    /**
     * Limit how many Tasks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput;
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>;
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>;
  };

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null;
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput;
  };

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput;
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number;
  };

  /**
   * Task.subtasks
   */
  export type Task$subtasksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    where?: SubtaskWhereInput;
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[];
    cursor?: SubtaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[];
  };

  /**
   * Task.comments
   */
  export type Task$commentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    where?: CommentWhereInput;
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    cursor?: CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[];
  };

  /**
   * Task.historyEvents
   */
  export type Task$historyEventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    where?: TaskHistoryEventWhereInput;
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    cursor?: TaskHistoryEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TaskHistoryEventScalarFieldEnum | TaskHistoryEventScalarFieldEnum[];
  };

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Task
       */
      select?: TaskSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Task
       */
      omit?: TaskOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: TaskInclude<ExtArgs> | null;
    };

  /**
   * Model Subtask
   */

  export type AggregateSubtask = {
    _count: SubtaskCountAggregateOutputType | null;
    _avg: SubtaskAvgAggregateOutputType | null;
    _sum: SubtaskSumAggregateOutputType | null;
    _min: SubtaskMinAggregateOutputType | null;
    _max: SubtaskMaxAggregateOutputType | null;
  };

  export type SubtaskAvgAggregateOutputType = {
    position: number | null;
  };

  export type SubtaskSumAggregateOutputType = {
    position: number | null;
  };

  export type SubtaskMinAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    title: string | null;
    description: string | null;
    isCompleted: boolean | null;
    position: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SubtaskMaxAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    title: string | null;
    description: string | null;
    isCompleted: boolean | null;
    position: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SubtaskCountAggregateOutputType = {
    id: number;
    taskId: number;
    title: number;
    description: number;
    isCompleted: number;
    position: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SubtaskAvgAggregateInputType = {
    position?: true;
  };

  export type SubtaskSumAggregateInputType = {
    position?: true;
  };

  export type SubtaskMinAggregateInputType = {
    id?: true;
    taskId?: true;
    title?: true;
    description?: true;
    isCompleted?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SubtaskMaxAggregateInputType = {
    id?: true;
    taskId?: true;
    title?: true;
    description?: true;
    isCompleted?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SubtaskCountAggregateInputType = {
    id?: true;
    taskId?: true;
    title?: true;
    description?: true;
    isCompleted?: true;
    position?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SubtaskAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Subtask to aggregate.
     */
    where?: SubtaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SubtaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subtasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Subtasks
     **/
    _count?: true | SubtaskCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: SubtaskAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: SubtaskSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SubtaskMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SubtaskMaxAggregateInputType;
  };

  export type GetSubtaskAggregateType<T extends SubtaskAggregateArgs> = {
    [P in keyof T & keyof AggregateSubtask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtask[P]>
      : GetScalarType<T[P], AggregateSubtask[P]>;
  };

  export type SubtaskGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SubtaskWhereInput;
    orderBy?: SubtaskOrderByWithAggregationInput | SubtaskOrderByWithAggregationInput[];
    by: SubtaskScalarFieldEnum[] | SubtaskScalarFieldEnum;
    having?: SubtaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubtaskCountAggregateInputType | true;
    _avg?: SubtaskAvgAggregateInputType;
    _sum?: SubtaskSumAggregateInputType;
    _min?: SubtaskMinAggregateInputType;
    _max?: SubtaskMaxAggregateInputType;
  };

  export type SubtaskGroupByOutputType = {
    id: string;
    taskId: string;
    title: string;
    description: string;
    isCompleted: boolean;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    _count: SubtaskCountAggregateOutputType | null;
    _avg: SubtaskAvgAggregateOutputType | null;
    _sum: SubtaskSumAggregateOutputType | null;
    _min: SubtaskMinAggregateOutputType | null;
    _max: SubtaskMaxAggregateOutputType | null;
  };

  type GetSubtaskGroupByPayload<T extends SubtaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtaskGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SubtaskGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
          : GetScalarType<T[P], SubtaskGroupByOutputType[P]>;
      }
    >
  >;

  export type SubtaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        taskId?: boolean;
        title?: boolean;
        description?: boolean;
        isCompleted?: boolean;
        position?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        task?: boolean | TaskDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['subtask']
    >;

  export type SubtaskSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      title?: boolean;
      description?: boolean;
      isCompleted?: boolean;
      position?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['subtask']
  >;

  export type SubtaskSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      title?: boolean;
      description?: boolean;
      isCompleted?: boolean;
      position?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['subtask']
  >;

  export type SubtaskSelectScalar = {
    id?: boolean;
    taskId?: boolean;
    title?: boolean;
    description?: boolean;
    isCompleted?: boolean;
    position?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SubtaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'taskId'
      | 'title'
      | 'description'
      | 'isCompleted'
      | 'position'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['subtask']
    >;
  export type SubtaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
  };
  export type SubtaskIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
  };
  export type SubtaskIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
  };

  export type $SubtaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Subtask';
      objects: {
        task: Prisma.$TaskPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          taskId: string;
          title: string;
          description: string;
          isCompleted: boolean;
          position: number;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['subtask']
      >;
      composites: {};
    };

  type SubtaskGetPayload<S extends boolean | null | undefined | SubtaskDefaultArgs> =
    $Result.GetResult<Prisma.$SubtaskPayload, S>;

  type SubtaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    SubtaskFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: SubtaskCountAggregateInputType | true;
  };

  export interface SubtaskDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subtask']; meta: { name: 'Subtask' } };
    /**
     * Find zero or one Subtask that matches the filter.
     * @param {SubtaskFindUniqueArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubtaskFindUniqueArgs>(
      args: SelectSubset<T, SubtaskFindUniqueArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Subtask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubtaskFindUniqueOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubtaskFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SubtaskFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Subtask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubtaskFindFirstArgs>(
      args?: SelectSubset<T, SubtaskFindFirstArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Subtask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubtaskFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SubtaskFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtasks
     * const subtasks = await prisma.subtask.findMany()
     *
     * // Get first 10 Subtasks
     * const subtasks = await prisma.subtask.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const subtaskWithIdOnly = await prisma.subtask.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SubtaskFindManyArgs>(
      args?: SelectSubset<T, SubtaskFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Subtask.
     * @param {SubtaskCreateArgs} args - Arguments to create a Subtask.
     * @example
     * // Create one Subtask
     * const Subtask = await prisma.subtask.create({
     *   data: {
     *     // ... data to create a Subtask
     *   }
     * })
     *
     */
    create<T extends SubtaskCreateArgs>(
      args: SelectSubset<T, SubtaskCreateArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Subtasks.
     * @param {SubtaskCreateManyArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SubtaskCreateManyArgs>(
      args?: SelectSubset<T, SubtaskCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Subtasks and returns the data saved in the database.
     * @param {SubtaskCreateManyAndReturnArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SubtaskCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SubtaskCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SubtaskPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Subtask.
     * @param {SubtaskDeleteArgs} args - Arguments to delete one Subtask.
     * @example
     * // Delete one Subtask
     * const Subtask = await prisma.subtask.delete({
     *   where: {
     *     // ... filter to delete one Subtask
     *   }
     * })
     *
     */
    delete<T extends SubtaskDeleteArgs>(
      args: SelectSubset<T, SubtaskDeleteArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Subtask.
     * @param {SubtaskUpdateArgs} args - Arguments to update one Subtask.
     * @example
     * // Update one Subtask
     * const subtask = await prisma.subtask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SubtaskUpdateArgs>(
      args: SelectSubset<T, SubtaskUpdateArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Subtasks.
     * @param {SubtaskDeleteManyArgs} args - Arguments to filter Subtasks to delete.
     * @example
     * // Delete a few Subtasks
     * const { count } = await prisma.subtask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SubtaskDeleteManyArgs>(
      args?: SelectSubset<T, SubtaskDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SubtaskUpdateManyArgs>(
      args: SelectSubset<T, SubtaskUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Subtasks and returns the data updated in the database.
     * @param {SubtaskUpdateManyAndReturnArgs} args - Arguments to update many Subtasks.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SubtaskUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SubtaskUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SubtaskPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Subtask.
     * @param {SubtaskUpsertArgs} args - Arguments to update or create a Subtask.
     * @example
     * // Update or create a Subtask
     * const subtask = await prisma.subtask.upsert({
     *   create: {
     *     // ... data to create a Subtask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtask we want to update
     *   }
     * })
     */
    upsert<T extends SubtaskUpsertArgs>(
      args: SelectSubset<T, SubtaskUpsertArgs<ExtArgs>>,
    ): Prisma__SubtaskClient<
      $Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskCountArgs} args - Arguments to filter Subtasks to count.
     * @example
     * // Count the number of Subtasks
     * const count = await prisma.subtask.count({
     *   where: {
     *     // ... the filter for the Subtasks we want to count
     *   }
     * })
     **/
    count<T extends SubtaskCountArgs>(
      args?: Subset<T, SubtaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtaskCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SubtaskAggregateArgs>(
      args: Subset<T, SubtaskAggregateArgs>,
    ): Prisma.PrismaPromise<GetSubtaskAggregateType<T>>;

    /**
     * Group by Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SubtaskGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: SubtaskGroupByArgs['orderBy'] }
        : { orderBy?: SubtaskGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, SubtaskGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetSubtaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Subtask model
     */
    readonly fields: SubtaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subtask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubtaskClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TaskDefaultArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      | $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Subtask model
   */
  interface SubtaskFieldRefs {
    readonly id: FieldRef<'Subtask', 'String'>;
    readonly taskId: FieldRef<'Subtask', 'String'>;
    readonly title: FieldRef<'Subtask', 'String'>;
    readonly description: FieldRef<'Subtask', 'String'>;
    readonly isCompleted: FieldRef<'Subtask', 'Boolean'>;
    readonly position: FieldRef<'Subtask', 'Int'>;
    readonly createdAt: FieldRef<'Subtask', 'DateTime'>;
    readonly updatedAt: FieldRef<'Subtask', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Subtask findUnique
   */
  export type SubtaskFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput;
  };

  /**
   * Subtask findUniqueOrThrow
   */
  export type SubtaskFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput;
  };

  /**
   * Subtask findFirst
   */
  export type SubtaskFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subtasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[];
  };

  /**
   * Subtask findFirstOrThrow
   */
  export type SubtaskFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subtasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[];
  };

  /**
   * Subtask findMany
   */
  export type SubtaskFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter, which Subtasks to fetch.
     */
    where?: SubtaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subtasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[];
  };

  /**
   * Subtask create
   */
  export type SubtaskCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * The data needed to create a Subtask.
     */
    data: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>;
  };

  /**
   * Subtask createMany
   */
  export type SubtaskCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Subtask createManyAndReturn
   */
  export type SubtaskCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Subtask update
   */
  export type SubtaskUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * The data needed to update a Subtask.
     */
    data: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>;
    /**
     * Choose, which Subtask to update.
     */
    where: SubtaskWhereUniqueInput;
  };

  /**
   * Subtask updateMany
   */
  export type SubtaskUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>;
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput;
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number;
  };

  /**
   * Subtask updateManyAndReturn
   */
  export type SubtaskUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>;
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput;
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Subtask upsert
   */
  export type SubtaskUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * The filter to search for the Subtask to update in case it exists.
     */
    where: SubtaskWhereUniqueInput;
    /**
     * In case the Subtask found by the `where` argument doesn't exist, create a new Subtask with this data.
     */
    create: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>;
    /**
     * In case the Subtask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>;
  };

  /**
   * Subtask delete
   */
  export type SubtaskDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
    /**
     * Filter which Subtask to delete.
     */
    where: SubtaskWhereUniqueInput;
  };

  /**
   * Subtask deleteMany
   */
  export type SubtaskDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Subtasks to delete
     */
    where?: SubtaskWhereInput;
    /**
     * Limit how many Subtasks to delete.
     */
    limit?: number;
  };

  /**
   * Subtask without action
   */
  export type SubtaskDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null;
  };

  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
  };

  export type CommentMinAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    authorId: string | null;
    text: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CommentMaxAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    authorId: string | null;
    text: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CommentCountAggregateOutputType = {
    id: number;
    taskId: number;
    authorId: number;
    text: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type CommentMinAggregateInputType = {
    id?: true;
    taskId?: true;
    authorId?: true;
    text?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CommentMaxAggregateInputType = {
    id?: true;
    taskId?: true;
    authorId?: true;
    text?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CommentCountAggregateInputType = {
    id?: true;
    taskId?: true;
    authorId?: true;
    text?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type CommentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Comments
     **/
    _count?: true | CommentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CommentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CommentMaxAggregateInputType;
  };

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
    [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>;
  };

  export type CommentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CommentWhereInput;
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[];
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum;
    having?: CommentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommentCountAggregateInputType | true;
    _min?: CommentMinAggregateInputType;
    _max?: CommentMaxAggregateInputType;
  };

  export type CommentGroupByOutputType = {
    id: string;
    taskId: string;
    authorId: string | null;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CommentCountAggregateOutputType | null;
    _min: CommentMinAggregateOutputType | null;
    _max: CommentMaxAggregateOutputType | null;
  };

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof CommentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
          : GetScalarType<T[P], CommentGroupByOutputType[P]>;
      }
    >
  >;

  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        taskId?: boolean;
        authorId?: boolean;
        text?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        task?: boolean | TaskDefaultArgs<ExtArgs>;
        author?: boolean | Comment$authorArgs<ExtArgs>;
      },
      ExtArgs['result']['comment']
    >;

  export type CommentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      authorId?: boolean;
      text?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
      author?: boolean | Comment$authorArgs<ExtArgs>;
    },
    ExtArgs['result']['comment']
  >;

  export type CommentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      authorId?: boolean;
      text?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
      author?: boolean | Comment$authorArgs<ExtArgs>;
    },
    ExtArgs['result']['comment']
  >;

  export type CommentSelectScalar = {
    id?: boolean;
    taskId?: boolean;
    authorId?: boolean;
    text?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'taskId' | 'authorId' | 'text' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['comment']
    >;
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    author?: boolean | Comment$authorArgs<ExtArgs>;
  };
  export type CommentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    author?: boolean | Comment$authorArgs<ExtArgs>;
  };
  export type CommentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    author?: boolean | Comment$authorArgs<ExtArgs>;
  };

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Comment';
      objects: {
        task: Prisma.$TaskPayload<ExtArgs>;
        author: Prisma.$UserPayload<ExtArgs> | null;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          taskId: string;
          authorId: string | null;
          text: string;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['comment']
      >;
      composites: {};
    };

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> =
    $Result.GetResult<Prisma.$CommentPayload, S>;

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    CommentFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: CommentCountAggregateInputType | true;
  };

  export interface CommentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment']; meta: { name: 'Comment' } };
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(
      args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(
      args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     *
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CommentFindManyArgs>(
      args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     *
     */
    create<T extends CommentCreateArgs>(
      args: SelectSubset<T, CommentCreateArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CommentCreateManyArgs>(
      args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CommentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     *
     */
    delete<T extends CommentDeleteArgs>(
      args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CommentUpdateArgs>(
      args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CommentDeleteManyArgs>(
      args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CommentUpdateManyArgs>(
      args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CommentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(
      args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>,
    ): Prisma__CommentClient<
      $Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
     **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CommentAggregateArgs>(
      args: Subset<T, CommentAggregateArgs>,
    ): Prisma.PrismaPromise<GetCommentAggregateType<T>>;

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Comment model
     */
    readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TaskDefaultArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      | $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    author<T extends Comment$authorArgs<ExtArgs> = {}>(
      args?: Subset<T, Comment$authorArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<'Comment', 'String'>;
    readonly taskId: FieldRef<'Comment', 'String'>;
    readonly authorId: FieldRef<'Comment', 'String'>;
    readonly text: FieldRef<'Comment', 'String'>;
    readonly createdAt: FieldRef<'Comment', 'DateTime'>;
    readonly updatedAt: FieldRef<'Comment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[];
  };

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[];
  };

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Comments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[];
  };

  /**
   * Comment create
   */
  export type CommentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>;
  };

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Comment update
   */
  export type CommentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>;
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>;
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput;
    /**
     * Limit how many Comments to update.
     */
    limit?: number;
  };

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>;
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput;
    /**
     * Limit how many Comments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput;
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>;
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>;
  };

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput;
  };

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput;
    /**
     * Limit how many Comments to delete.
     */
    limit?: number;
  };

  /**
   * Comment.author
   */
  export type Comment$authorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null;
  };

  /**
   * Model TaskHistoryEvent
   */

  export type AggregateTaskHistoryEvent = {
    _count: TaskHistoryEventCountAggregateOutputType | null;
    _min: TaskHistoryEventMinAggregateOutputType | null;
    _max: TaskHistoryEventMaxAggregateOutputType | null;
  };

  export type TaskHistoryEventMinAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    actorId: string | null;
    type: $Enums.TaskHistoryEventType | null;
    createdAt: Date | null;
  };

  export type TaskHistoryEventMaxAggregateOutputType = {
    id: string | null;
    taskId: string | null;
    actorId: string | null;
    type: $Enums.TaskHistoryEventType | null;
    createdAt: Date | null;
  };

  export type TaskHistoryEventCountAggregateOutputType = {
    id: number;
    taskId: number;
    actorId: number;
    type: number;
    payload: number;
    createdAt: number;
    _all: number;
  };

  export type TaskHistoryEventMinAggregateInputType = {
    id?: true;
    taskId?: true;
    actorId?: true;
    type?: true;
    createdAt?: true;
  };

  export type TaskHistoryEventMaxAggregateInputType = {
    id?: true;
    taskId?: true;
    actorId?: true;
    type?: true;
    createdAt?: true;
  };

  export type TaskHistoryEventCountAggregateInputType = {
    id?: true;
    taskId?: true;
    actorId?: true;
    type?: true;
    payload?: true;
    createdAt?: true;
    _all?: true;
  };

  export type TaskHistoryEventAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which TaskHistoryEvent to aggregate.
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TaskHistoryEvents to fetch.
     */
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TaskHistoryEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TaskHistoryEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TaskHistoryEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned TaskHistoryEvents
     **/
    _count?: true | TaskHistoryEventCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TaskHistoryEventMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TaskHistoryEventMaxAggregateInputType;
  };

  export type GetTaskHistoryEventAggregateType<T extends TaskHistoryEventAggregateArgs> = {
    [P in keyof T & keyof AggregateTaskHistoryEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskHistoryEvent[P]>
      : GetScalarType<T[P], AggregateTaskHistoryEvent[P]>;
  };

  export type TaskHistoryEventGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TaskHistoryEventWhereInput;
    orderBy?:
      TaskHistoryEventOrderByWithAggregationInput | TaskHistoryEventOrderByWithAggregationInput[];
    by: TaskHistoryEventScalarFieldEnum[] | TaskHistoryEventScalarFieldEnum;
    having?: TaskHistoryEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TaskHistoryEventCountAggregateInputType | true;
    _min?: TaskHistoryEventMinAggregateInputType;
    _max?: TaskHistoryEventMaxAggregateInputType;
  };

  export type TaskHistoryEventGroupByOutputType = {
    id: string;
    taskId: string;
    actorId: string | null;
    type: $Enums.TaskHistoryEventType;
    payload: JsonValue | null;
    createdAt: Date;
    _count: TaskHistoryEventCountAggregateOutputType | null;
    _min: TaskHistoryEventMinAggregateOutputType | null;
    _max: TaskHistoryEventMaxAggregateOutputType | null;
  };

  type GetTaskHistoryEventGroupByPayload<T extends TaskHistoryEventGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TaskHistoryEventGroupByOutputType, T['by']> & {
          [P in keyof T & keyof TaskHistoryEventGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskHistoryEventGroupByOutputType[P]>
            : GetScalarType<T[P], TaskHistoryEventGroupByOutputType[P]>;
        }
      >
    >;

  export type TaskHistoryEventSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      actorId?: boolean;
      type?: boolean;
      payload?: boolean;
      createdAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
      actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
    },
    ExtArgs['result']['taskHistoryEvent']
  >;

  export type TaskHistoryEventSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      actorId?: boolean;
      type?: boolean;
      payload?: boolean;
      createdAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
      actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
    },
    ExtArgs['result']['taskHistoryEvent']
  >;

  export type TaskHistoryEventSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      taskId?: boolean;
      actorId?: boolean;
      type?: boolean;
      payload?: boolean;
      createdAt?: boolean;
      task?: boolean | TaskDefaultArgs<ExtArgs>;
      actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
    },
    ExtArgs['result']['taskHistoryEvent']
  >;

  export type TaskHistoryEventSelectScalar = {
    id?: boolean;
    taskId?: boolean;
    actorId?: boolean;
    type?: boolean;
    payload?: boolean;
    createdAt?: boolean;
  };

  export type TaskHistoryEventOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'taskId' | 'actorId' | 'type' | 'payload' | 'createdAt',
    ExtArgs['result']['taskHistoryEvent']
  >;
  export type TaskHistoryEventInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
  };
  export type TaskHistoryEventIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
  };
  export type TaskHistoryEventIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    task?: boolean | TaskDefaultArgs<ExtArgs>;
    actor?: boolean | TaskHistoryEvent$actorArgs<ExtArgs>;
  };

  export type $TaskHistoryEventPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'TaskHistoryEvent';
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>;
      actor: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        taskId: string;
        actorId: string | null;
        type: $Enums.TaskHistoryEventType;
        payload: Prisma.JsonValue | null;
        createdAt: Date;
      },
      ExtArgs['result']['taskHistoryEvent']
    >;
    composites: {};
  };

  type TaskHistoryEventGetPayload<
    S extends boolean | null | undefined | TaskHistoryEventDefaultArgs,
  > = $Result.GetResult<Prisma.$TaskHistoryEventPayload, S>;

  type TaskHistoryEventCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<TaskHistoryEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TaskHistoryEventCountAggregateInputType | true;
  };

  export interface TaskHistoryEventDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['TaskHistoryEvent'];
      meta: { name: 'TaskHistoryEvent' };
    };
    /**
     * Find zero or one TaskHistoryEvent that matches the filter.
     * @param {TaskHistoryEventFindUniqueArgs} args - Arguments to find a TaskHistoryEvent
     * @example
     * // Get one TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskHistoryEventFindUniqueArgs>(
      args: SelectSubset<T, TaskHistoryEventFindUniqueArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one TaskHistoryEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskHistoryEventFindUniqueOrThrowArgs} args - Arguments to find a TaskHistoryEvent
     * @example
     * // Get one TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskHistoryEventFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TaskHistoryEventFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first TaskHistoryEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventFindFirstArgs} args - Arguments to find a TaskHistoryEvent
     * @example
     * // Get one TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskHistoryEventFindFirstArgs>(
      args?: SelectSubset<T, TaskHistoryEventFindFirstArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first TaskHistoryEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventFindFirstOrThrowArgs} args - Arguments to find a TaskHistoryEvent
     * @example
     * // Get one TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskHistoryEventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TaskHistoryEventFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more TaskHistoryEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskHistoryEvents
     * const taskHistoryEvents = await prisma.taskHistoryEvent.findMany()
     *
     * // Get first 10 TaskHistoryEvents
     * const taskHistoryEvents = await prisma.taskHistoryEvent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const taskHistoryEventWithIdOnly = await prisma.taskHistoryEvent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TaskHistoryEventFindManyArgs>(
      args?: SelectSubset<T, TaskHistoryEventFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TaskHistoryEventPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a TaskHistoryEvent.
     * @param {TaskHistoryEventCreateArgs} args - Arguments to create a TaskHistoryEvent.
     * @example
     * // Create one TaskHistoryEvent
     * const TaskHistoryEvent = await prisma.taskHistoryEvent.create({
     *   data: {
     *     // ... data to create a TaskHistoryEvent
     *   }
     * })
     *
     */
    create<T extends TaskHistoryEventCreateArgs>(
      args: SelectSubset<T, TaskHistoryEventCreateArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<Prisma.$TaskHistoryEventPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many TaskHistoryEvents.
     * @param {TaskHistoryEventCreateManyArgs} args - Arguments to create many TaskHistoryEvents.
     * @example
     * // Create many TaskHistoryEvents
     * const taskHistoryEvent = await prisma.taskHistoryEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TaskHistoryEventCreateManyArgs>(
      args?: SelectSubset<T, TaskHistoryEventCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many TaskHistoryEvents and returns the data saved in the database.
     * @param {TaskHistoryEventCreateManyAndReturnArgs} args - Arguments to create many TaskHistoryEvents.
     * @example
     * // Create many TaskHistoryEvents
     * const taskHistoryEvent = await prisma.taskHistoryEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many TaskHistoryEvents and only return the `id`
     * const taskHistoryEventWithIdOnly = await prisma.taskHistoryEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TaskHistoryEventCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TaskHistoryEventCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a TaskHistoryEvent.
     * @param {TaskHistoryEventDeleteArgs} args - Arguments to delete one TaskHistoryEvent.
     * @example
     * // Delete one TaskHistoryEvent
     * const TaskHistoryEvent = await prisma.taskHistoryEvent.delete({
     *   where: {
     *     // ... filter to delete one TaskHistoryEvent
     *   }
     * })
     *
     */
    delete<T extends TaskHistoryEventDeleteArgs>(
      args: SelectSubset<T, TaskHistoryEventDeleteArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<Prisma.$TaskHistoryEventPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one TaskHistoryEvent.
     * @param {TaskHistoryEventUpdateArgs} args - Arguments to update one TaskHistoryEvent.
     * @example
     * // Update one TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TaskHistoryEventUpdateArgs>(
      args: SelectSubset<T, TaskHistoryEventUpdateArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<Prisma.$TaskHistoryEventPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more TaskHistoryEvents.
     * @param {TaskHistoryEventDeleteManyArgs} args - Arguments to filter TaskHistoryEvents to delete.
     * @example
     * // Delete a few TaskHistoryEvents
     * const { count } = await prisma.taskHistoryEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TaskHistoryEventDeleteManyArgs>(
      args?: SelectSubset<T, TaskHistoryEventDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more TaskHistoryEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskHistoryEvents
     * const taskHistoryEvent = await prisma.taskHistoryEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TaskHistoryEventUpdateManyArgs>(
      args: SelectSubset<T, TaskHistoryEventUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more TaskHistoryEvents and returns the data updated in the database.
     * @param {TaskHistoryEventUpdateManyAndReturnArgs} args - Arguments to update many TaskHistoryEvents.
     * @example
     * // Update many TaskHistoryEvents
     * const taskHistoryEvent = await prisma.taskHistoryEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more TaskHistoryEvents and only return the `id`
     * const taskHistoryEventWithIdOnly = await prisma.taskHistoryEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TaskHistoryEventUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TaskHistoryEventUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TaskHistoryEventPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one TaskHistoryEvent.
     * @param {TaskHistoryEventUpsertArgs} args - Arguments to update or create a TaskHistoryEvent.
     * @example
     * // Update or create a TaskHistoryEvent
     * const taskHistoryEvent = await prisma.taskHistoryEvent.upsert({
     *   create: {
     *     // ... data to create a TaskHistoryEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskHistoryEvent we want to update
     *   }
     * })
     */
    upsert<T extends TaskHistoryEventUpsertArgs>(
      args: SelectSubset<T, TaskHistoryEventUpsertArgs<ExtArgs>>,
    ): Prisma__TaskHistoryEventClient<
      $Result.GetResult<Prisma.$TaskHistoryEventPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of TaskHistoryEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventCountArgs} args - Arguments to filter TaskHistoryEvents to count.
     * @example
     * // Count the number of TaskHistoryEvents
     * const count = await prisma.taskHistoryEvent.count({
     *   where: {
     *     // ... the filter for the TaskHistoryEvents we want to count
     *   }
     * })
     **/
    count<T extends TaskHistoryEventCountArgs>(
      args?: Subset<T, TaskHistoryEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskHistoryEventCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a TaskHistoryEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TaskHistoryEventAggregateArgs>(
      args: Subset<T, TaskHistoryEventAggregateArgs>,
    ): Prisma.PrismaPromise<GetTaskHistoryEventAggregateType<T>>;

    /**
     * Group by TaskHistoryEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskHistoryEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TaskHistoryEventGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: TaskHistoryEventGroupByArgs['orderBy'] }
        : { orderBy?: TaskHistoryEventGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, TaskHistoryEventGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetTaskHistoryEventGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the TaskHistoryEvent model
     */
    readonly fields: TaskHistoryEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskHistoryEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskHistoryEventClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, TaskDefaultArgs<ExtArgs>>,
    ): Prisma__TaskClient<
      | $Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    actor<T extends TaskHistoryEvent$actorArgs<ExtArgs> = {}>(
      args?: Subset<T, TaskHistoryEvent$actorArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the TaskHistoryEvent model
   */
  interface TaskHistoryEventFieldRefs {
    readonly id: FieldRef<'TaskHistoryEvent', 'String'>;
    readonly taskId: FieldRef<'TaskHistoryEvent', 'String'>;
    readonly actorId: FieldRef<'TaskHistoryEvent', 'String'>;
    readonly type: FieldRef<'TaskHistoryEvent', 'TaskHistoryEventType'>;
    readonly payload: FieldRef<'TaskHistoryEvent', 'Json'>;
    readonly createdAt: FieldRef<'TaskHistoryEvent', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * TaskHistoryEvent findUnique
   */
  export type TaskHistoryEventFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter, which TaskHistoryEvent to fetch.
     */
    where: TaskHistoryEventWhereUniqueInput;
  };

  /**
   * TaskHistoryEvent findUniqueOrThrow
   */
  export type TaskHistoryEventFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter, which TaskHistoryEvent to fetch.
     */
    where: TaskHistoryEventWhereUniqueInput;
  };

  /**
   * TaskHistoryEvent findFirst
   */
  export type TaskHistoryEventFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter, which TaskHistoryEvent to fetch.
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TaskHistoryEvents to fetch.
     */
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TaskHistoryEvents.
     */
    cursor?: TaskHistoryEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TaskHistoryEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TaskHistoryEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TaskHistoryEvents.
     */
    distinct?: TaskHistoryEventScalarFieldEnum | TaskHistoryEventScalarFieldEnum[];
  };

  /**
   * TaskHistoryEvent findFirstOrThrow
   */
  export type TaskHistoryEventFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter, which TaskHistoryEvent to fetch.
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TaskHistoryEvents to fetch.
     */
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TaskHistoryEvents.
     */
    cursor?: TaskHistoryEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TaskHistoryEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TaskHistoryEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TaskHistoryEvents.
     */
    distinct?: TaskHistoryEventScalarFieldEnum | TaskHistoryEventScalarFieldEnum[];
  };

  /**
   * TaskHistoryEvent findMany
   */
  export type TaskHistoryEventFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter, which TaskHistoryEvents to fetch.
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TaskHistoryEvents to fetch.
     */
    orderBy?: TaskHistoryEventOrderByWithRelationInput | TaskHistoryEventOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing TaskHistoryEvents.
     */
    cursor?: TaskHistoryEventWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TaskHistoryEvents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TaskHistoryEvents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TaskHistoryEvents.
     */
    distinct?: TaskHistoryEventScalarFieldEnum | TaskHistoryEventScalarFieldEnum[];
  };

  /**
   * TaskHistoryEvent create
   */
  export type TaskHistoryEventCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * The data needed to create a TaskHistoryEvent.
     */
    data: XOR<TaskHistoryEventCreateInput, TaskHistoryEventUncheckedCreateInput>;
  };

  /**
   * TaskHistoryEvent createMany
   */
  export type TaskHistoryEventCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many TaskHistoryEvents.
     */
    data: TaskHistoryEventCreateManyInput | TaskHistoryEventCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * TaskHistoryEvent createManyAndReturn
   */
  export type TaskHistoryEventCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * The data used to create many TaskHistoryEvents.
     */
    data: TaskHistoryEventCreateManyInput | TaskHistoryEventCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * TaskHistoryEvent update
   */
  export type TaskHistoryEventUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * The data needed to update a TaskHistoryEvent.
     */
    data: XOR<TaskHistoryEventUpdateInput, TaskHistoryEventUncheckedUpdateInput>;
    /**
     * Choose, which TaskHistoryEvent to update.
     */
    where: TaskHistoryEventWhereUniqueInput;
  };

  /**
   * TaskHistoryEvent updateMany
   */
  export type TaskHistoryEventUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update TaskHistoryEvents.
     */
    data: XOR<TaskHistoryEventUpdateManyMutationInput, TaskHistoryEventUncheckedUpdateManyInput>;
    /**
     * Filter which TaskHistoryEvents to update
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * Limit how many TaskHistoryEvents to update.
     */
    limit?: number;
  };

  /**
   * TaskHistoryEvent updateManyAndReturn
   */
  export type TaskHistoryEventUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * The data used to update TaskHistoryEvents.
     */
    data: XOR<TaskHistoryEventUpdateManyMutationInput, TaskHistoryEventUncheckedUpdateManyInput>;
    /**
     * Filter which TaskHistoryEvents to update
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * Limit how many TaskHistoryEvents to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * TaskHistoryEvent upsert
   */
  export type TaskHistoryEventUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * The filter to search for the TaskHistoryEvent to update in case it exists.
     */
    where: TaskHistoryEventWhereUniqueInput;
    /**
     * In case the TaskHistoryEvent found by the `where` argument doesn't exist, create a new TaskHistoryEvent with this data.
     */
    create: XOR<TaskHistoryEventCreateInput, TaskHistoryEventUncheckedCreateInput>;
    /**
     * In case the TaskHistoryEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskHistoryEventUpdateInput, TaskHistoryEventUncheckedUpdateInput>;
  };

  /**
   * TaskHistoryEvent delete
   */
  export type TaskHistoryEventDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
    /**
     * Filter which TaskHistoryEvent to delete.
     */
    where: TaskHistoryEventWhereUniqueInput;
  };

  /**
   * TaskHistoryEvent deleteMany
   */
  export type TaskHistoryEventDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which TaskHistoryEvents to delete
     */
    where?: TaskHistoryEventWhereInput;
    /**
     * Limit how many TaskHistoryEvents to delete.
     */
    limit?: number;
  };

  /**
   * TaskHistoryEvent.actor
   */
  export type TaskHistoryEvent$actorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * TaskHistoryEvent without action
   */
  export type TaskHistoryEventDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TaskHistoryEvent
     */
    select?: TaskHistoryEventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TaskHistoryEvent
     */
    omit?: TaskHistoryEventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskHistoryEventInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const PasswordCredentialScalarFieldEnum: {
    userId: 'userId';
    passwordHash: 'passwordHash';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PasswordCredentialScalarFieldEnum =
    (typeof PasswordCredentialScalarFieldEnum)[keyof typeof PasswordCredentialScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    tokenHash: 'tokenHash';
    expiresAt: 'expiresAt';
    createdAt: 'createdAt';
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: 'id';
    email: 'email';
    name: 'name';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const BoardScalarFieldEnum: {
    id: 'id';
    title: 'title';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type BoardScalarFieldEnum =
    (typeof BoardScalarFieldEnum)[keyof typeof BoardScalarFieldEnum];

  export const BoardMemberScalarFieldEnum: {
    id: 'id';
    boardId: 'boardId';
    userId: 'userId';
    role: 'role';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type BoardMemberScalarFieldEnum =
    (typeof BoardMemberScalarFieldEnum)[keyof typeof BoardMemberScalarFieldEnum];

  export const ColumnScalarFieldEnum: {
    id: 'id';
    boardId: 'boardId';
    title: 'title';
    position: 'position';
    isCompleted: 'isCompleted';
    isArchive: 'isArchive';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ColumnScalarFieldEnum =
    (typeof ColumnScalarFieldEnum)[keyof typeof ColumnScalarFieldEnum];

  export const TaskScalarFieldEnum: {
    id: 'id';
    columnId: 'columnId';
    title: 'title';
    description: 'description';
    priority: 'priority';
    tags: 'tags';
    dueDate: 'dueDate';
    archivedAt: 'archivedAt';
    position: 'position';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum];

  export const SubtaskScalarFieldEnum: {
    id: 'id';
    taskId: 'taskId';
    title: 'title';
    description: 'description';
    isCompleted: 'isCompleted';
    position: 'position';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type SubtaskScalarFieldEnum =
    (typeof SubtaskScalarFieldEnum)[keyof typeof SubtaskScalarFieldEnum];

  export const CommentScalarFieldEnum: {
    id: 'id';
    taskId: 'taskId';
    authorId: 'authorId';
    text: 'text';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type CommentScalarFieldEnum =
    (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];

  export const TaskHistoryEventScalarFieldEnum: {
    id: 'id';
    taskId: 'taskId';
    actorId: 'actorId';
    type: 'type';
    payload: 'payload';
    createdAt: 'createdAt';
  };

  export type TaskHistoryEventScalarFieldEnum =
    (typeof TaskHistoryEventScalarFieldEnum)[keyof typeof TaskHistoryEventScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'BoardMemberRole'
   */
  export type EnumBoardMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BoardMemberRole'
  >;

  /**
   * Reference to a field of type 'BoardMemberRole[]'
   */
  export type ListEnumBoardMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BoardMemberRole[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'TaskPriority'
   */
  export type EnumTaskPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'TaskPriority'
  >;

  /**
   * Reference to a field of type 'TaskPriority[]'
   */
  export type ListEnumTaskPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'TaskPriority[]'
  >;

  /**
   * Reference to a field of type 'TaskHistoryEventType'
   */
  export type EnumTaskHistoryEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'TaskHistoryEventType'
  >;

  /**
   * Reference to a field of type 'TaskHistoryEventType[]'
   */
  export type ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'TaskHistoryEventType[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type PasswordCredentialWhereInput = {
    AND?: PasswordCredentialWhereInput | PasswordCredentialWhereInput[];
    OR?: PasswordCredentialWhereInput[];
    NOT?: PasswordCredentialWhereInput | PasswordCredentialWhereInput[];
    userId?: StringFilter<'PasswordCredential'> | string;
    passwordHash?: StringFilter<'PasswordCredential'> | string;
    createdAt?: DateTimeFilter<'PasswordCredential'> | Date | string;
    updatedAt?: DateTimeFilter<'PasswordCredential'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type PasswordCredentialOrderByWithRelationInput = {
    userId?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type PasswordCredentialWhereUniqueInput = Prisma.AtLeast<
    {
      userId?: string;
      AND?: PasswordCredentialWhereInput | PasswordCredentialWhereInput[];
      OR?: PasswordCredentialWhereInput[];
      NOT?: PasswordCredentialWhereInput | PasswordCredentialWhereInput[];
      passwordHash?: StringFilter<'PasswordCredential'> | string;
      createdAt?: DateTimeFilter<'PasswordCredential'> | Date | string;
      updatedAt?: DateTimeFilter<'PasswordCredential'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'userId'
  >;

  export type PasswordCredentialOrderByWithAggregationInput = {
    userId?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PasswordCredentialCountOrderByAggregateInput;
    _max?: PasswordCredentialMaxOrderByAggregateInput;
    _min?: PasswordCredentialMinOrderByAggregateInput;
  };

  export type PasswordCredentialScalarWhereWithAggregatesInput = {
    AND?:
      | PasswordCredentialScalarWhereWithAggregatesInput
      | PasswordCredentialScalarWhereWithAggregatesInput[];
    OR?: PasswordCredentialScalarWhereWithAggregatesInput[];
    NOT?:
      | PasswordCredentialScalarWhereWithAggregatesInput
      | PasswordCredentialScalarWhereWithAggregatesInput[];
    userId?: StringWithAggregatesFilter<'PasswordCredential'> | string;
    passwordHash?: StringWithAggregatesFilter<'PasswordCredential'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'PasswordCredential'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'PasswordCredential'> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    tokenHash?: StringFilter<'Session'> | string;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      tokenHash?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<'Session'> | string;
      expiresAt?: DateTimeFilter<'Session'> | Date | string;
      createdAt?: DateTimeFilter<'Session'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'tokenHash'
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Session'> | string;
    userId?: StringWithAggregatesFilter<'Session'> | string;
    tokenHash?: StringWithAggregatesFilter<'Session'> | string;
    expiresAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    name?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    passwordCredential?: XOR<
      PasswordCredentialNullableScalarRelationFilter,
      PasswordCredentialWhereInput
    > | null;
    sessions?: SessionListRelationFilter;
    memberships?: BoardMemberListRelationFilter;
    comments?: CommentListRelationFilter;
    historyEvents?: TaskHistoryEventListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    passwordCredential?: PasswordCredentialOrderByWithRelationInput;
    sessions?: SessionOrderByRelationAggregateInput;
    memberships?: BoardMemberOrderByRelationAggregateInput;
    comments?: CommentOrderByRelationAggregateInput;
    historyEvents?: TaskHistoryEventOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      passwordCredential?: XOR<
        PasswordCredentialNullableScalarRelationFilter,
        PasswordCredentialWhereInput
      > | null;
      sessions?: SessionListRelationFilter;
      memberships?: BoardMemberListRelationFilter;
      comments?: CommentListRelationFilter;
      historyEvents?: TaskHistoryEventListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    name?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type BoardWhereInput = {
    AND?: BoardWhereInput | BoardWhereInput[];
    OR?: BoardWhereInput[];
    NOT?: BoardWhereInput | BoardWhereInput[];
    id?: StringFilter<'Board'> | string;
    title?: StringFilter<'Board'> | string;
    createdAt?: DateTimeFilter<'Board'> | Date | string;
    updatedAt?: DateTimeFilter<'Board'> | Date | string;
    members?: BoardMemberListRelationFilter;
    columns?: ColumnListRelationFilter;
  };

  export type BoardOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    members?: BoardMemberOrderByRelationAggregateInput;
    columns?: ColumnOrderByRelationAggregateInput;
  };

  export type BoardWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: BoardWhereInput | BoardWhereInput[];
      OR?: BoardWhereInput[];
      NOT?: BoardWhereInput | BoardWhereInput[];
      title?: StringFilter<'Board'> | string;
      createdAt?: DateTimeFilter<'Board'> | Date | string;
      updatedAt?: DateTimeFilter<'Board'> | Date | string;
      members?: BoardMemberListRelationFilter;
      columns?: ColumnListRelationFilter;
    },
    'id'
  >;

  export type BoardOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: BoardCountOrderByAggregateInput;
    _max?: BoardMaxOrderByAggregateInput;
    _min?: BoardMinOrderByAggregateInput;
  };

  export type BoardScalarWhereWithAggregatesInput = {
    AND?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[];
    OR?: BoardScalarWhereWithAggregatesInput[];
    NOT?: BoardScalarWhereWithAggregatesInput | BoardScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Board'> | string;
    title?: StringWithAggregatesFilter<'Board'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Board'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Board'> | Date | string;
  };

  export type BoardMemberWhereInput = {
    AND?: BoardMemberWhereInput | BoardMemberWhereInput[];
    OR?: BoardMemberWhereInput[];
    NOT?: BoardMemberWhereInput | BoardMemberWhereInput[];
    id?: StringFilter<'BoardMember'> | string;
    boardId?: StringFilter<'BoardMember'> | string;
    userId?: StringFilter<'BoardMember'> | string;
    role?: EnumBoardMemberRoleFilter<'BoardMember'> | $Enums.BoardMemberRole;
    createdAt?: DateTimeFilter<'BoardMember'> | Date | string;
    updatedAt?: DateTimeFilter<'BoardMember'> | Date | string;
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type BoardMemberOrderByWithRelationInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    board?: BoardOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type BoardMemberWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      boardId_userId?: BoardMemberBoardIdUserIdCompoundUniqueInput;
      AND?: BoardMemberWhereInput | BoardMemberWhereInput[];
      OR?: BoardMemberWhereInput[];
      NOT?: BoardMemberWhereInput | BoardMemberWhereInput[];
      boardId?: StringFilter<'BoardMember'> | string;
      userId?: StringFilter<'BoardMember'> | string;
      role?: EnumBoardMemberRoleFilter<'BoardMember'> | $Enums.BoardMemberRole;
      createdAt?: DateTimeFilter<'BoardMember'> | Date | string;
      updatedAt?: DateTimeFilter<'BoardMember'> | Date | string;
      board?: XOR<BoardScalarRelationFilter, BoardWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'boardId_userId'
  >;

  export type BoardMemberOrderByWithAggregationInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: BoardMemberCountOrderByAggregateInput;
    _max?: BoardMemberMaxOrderByAggregateInput;
    _min?: BoardMemberMinOrderByAggregateInput;
  };

  export type BoardMemberScalarWhereWithAggregatesInput = {
    AND?: BoardMemberScalarWhereWithAggregatesInput | BoardMemberScalarWhereWithAggregatesInput[];
    OR?: BoardMemberScalarWhereWithAggregatesInput[];
    NOT?: BoardMemberScalarWhereWithAggregatesInput | BoardMemberScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'BoardMember'> | string;
    boardId?: StringWithAggregatesFilter<'BoardMember'> | string;
    userId?: StringWithAggregatesFilter<'BoardMember'> | string;
    role?: EnumBoardMemberRoleWithAggregatesFilter<'BoardMember'> | $Enums.BoardMemberRole;
    createdAt?: DateTimeWithAggregatesFilter<'BoardMember'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'BoardMember'> | Date | string;
  };

  export type ColumnWhereInput = {
    AND?: ColumnWhereInput | ColumnWhereInput[];
    OR?: ColumnWhereInput[];
    NOT?: ColumnWhereInput | ColumnWhereInput[];
    id?: StringFilter<'Column'> | string;
    boardId?: StringFilter<'Column'> | string;
    title?: StringFilter<'Column'> | string;
    position?: IntFilter<'Column'> | number;
    isCompleted?: BoolFilter<'Column'> | boolean;
    isArchive?: BoolFilter<'Column'> | boolean;
    createdAt?: DateTimeFilter<'Column'> | Date | string;
    updatedAt?: DateTimeFilter<'Column'> | Date | string;
    board?: XOR<BoardScalarRelationFilter, BoardWhereInput>;
    tasks?: TaskListRelationFilter;
  };

  export type ColumnOrderByWithRelationInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    title?: SortOrder;
    position?: SortOrder;
    isCompleted?: SortOrder;
    isArchive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    board?: BoardOrderByWithRelationInput;
    tasks?: TaskOrderByRelationAggregateInput;
  };

  export type ColumnWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      boardId_position?: ColumnBoardIdPositionCompoundUniqueInput;
      AND?: ColumnWhereInput | ColumnWhereInput[];
      OR?: ColumnWhereInput[];
      NOT?: ColumnWhereInput | ColumnWhereInput[];
      boardId?: StringFilter<'Column'> | string;
      title?: StringFilter<'Column'> | string;
      position?: IntFilter<'Column'> | number;
      isCompleted?: BoolFilter<'Column'> | boolean;
      isArchive?: BoolFilter<'Column'> | boolean;
      createdAt?: DateTimeFilter<'Column'> | Date | string;
      updatedAt?: DateTimeFilter<'Column'> | Date | string;
      board?: XOR<BoardScalarRelationFilter, BoardWhereInput>;
      tasks?: TaskListRelationFilter;
    },
    'id' | 'boardId_position'
  >;

  export type ColumnOrderByWithAggregationInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    title?: SortOrder;
    position?: SortOrder;
    isCompleted?: SortOrder;
    isArchive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ColumnCountOrderByAggregateInput;
    _avg?: ColumnAvgOrderByAggregateInput;
    _max?: ColumnMaxOrderByAggregateInput;
    _min?: ColumnMinOrderByAggregateInput;
    _sum?: ColumnSumOrderByAggregateInput;
  };

  export type ColumnScalarWhereWithAggregatesInput = {
    AND?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[];
    OR?: ColumnScalarWhereWithAggregatesInput[];
    NOT?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Column'> | string;
    boardId?: StringWithAggregatesFilter<'Column'> | string;
    title?: StringWithAggregatesFilter<'Column'> | string;
    position?: IntWithAggregatesFilter<'Column'> | number;
    isCompleted?: BoolWithAggregatesFilter<'Column'> | boolean;
    isArchive?: BoolWithAggregatesFilter<'Column'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'Column'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Column'> | Date | string;
  };

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[];
    OR?: TaskWhereInput[];
    NOT?: TaskWhereInput | TaskWhereInput[];
    id?: StringFilter<'Task'> | string;
    columnId?: StringFilter<'Task'> | string;
    title?: StringFilter<'Task'> | string;
    description?: StringFilter<'Task'> | string;
    priority?: EnumTaskPriorityFilter<'Task'> | $Enums.TaskPriority;
    tags?: StringNullableListFilter<'Task'>;
    dueDate?: DateTimeNullableFilter<'Task'> | Date | string | null;
    archivedAt?: DateTimeNullableFilter<'Task'> | Date | string | null;
    position?: IntFilter<'Task'> | number;
    createdAt?: DateTimeFilter<'Task'> | Date | string;
    updatedAt?: DateTimeFilter<'Task'> | Date | string;
    column?: XOR<ColumnScalarRelationFilter, ColumnWhereInput>;
    subtasks?: SubtaskListRelationFilter;
    comments?: CommentListRelationFilter;
    historyEvents?: TaskHistoryEventListRelationFilter;
  };

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder;
    columnId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    priority?: SortOrder;
    tags?: SortOrder;
    dueDate?: SortOrderInput | SortOrder;
    archivedAt?: SortOrderInput | SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    column?: ColumnOrderByWithRelationInput;
    subtasks?: SubtaskOrderByRelationAggregateInput;
    comments?: CommentOrderByRelationAggregateInput;
    historyEvents?: TaskHistoryEventOrderByRelationAggregateInput;
  };

  export type TaskWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      columnId_position?: TaskColumnIdPositionCompoundUniqueInput;
      AND?: TaskWhereInput | TaskWhereInput[];
      OR?: TaskWhereInput[];
      NOT?: TaskWhereInput | TaskWhereInput[];
      columnId?: StringFilter<'Task'> | string;
      title?: StringFilter<'Task'> | string;
      description?: StringFilter<'Task'> | string;
      priority?: EnumTaskPriorityFilter<'Task'> | $Enums.TaskPriority;
      tags?: StringNullableListFilter<'Task'>;
      dueDate?: DateTimeNullableFilter<'Task'> | Date | string | null;
      archivedAt?: DateTimeNullableFilter<'Task'> | Date | string | null;
      position?: IntFilter<'Task'> | number;
      createdAt?: DateTimeFilter<'Task'> | Date | string;
      updatedAt?: DateTimeFilter<'Task'> | Date | string;
      column?: XOR<ColumnScalarRelationFilter, ColumnWhereInput>;
      subtasks?: SubtaskListRelationFilter;
      comments?: CommentListRelationFilter;
      historyEvents?: TaskHistoryEventListRelationFilter;
    },
    'id' | 'columnId_position'
  >;

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder;
    columnId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    priority?: SortOrder;
    tags?: SortOrder;
    dueDate?: SortOrderInput | SortOrder;
    archivedAt?: SortOrderInput | SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: TaskCountOrderByAggregateInput;
    _avg?: TaskAvgOrderByAggregateInput;
    _max?: TaskMaxOrderByAggregateInput;
    _min?: TaskMinOrderByAggregateInput;
    _sum?: TaskSumOrderByAggregateInput;
  };

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[];
    OR?: TaskScalarWhereWithAggregatesInput[];
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Task'> | string;
    columnId?: StringWithAggregatesFilter<'Task'> | string;
    title?: StringWithAggregatesFilter<'Task'> | string;
    description?: StringWithAggregatesFilter<'Task'> | string;
    priority?: EnumTaskPriorityWithAggregatesFilter<'Task'> | $Enums.TaskPriority;
    tags?: StringNullableListFilter<'Task'>;
    dueDate?: DateTimeNullableWithAggregatesFilter<'Task'> | Date | string | null;
    archivedAt?: DateTimeNullableWithAggregatesFilter<'Task'> | Date | string | null;
    position?: IntWithAggregatesFilter<'Task'> | number;
    createdAt?: DateTimeWithAggregatesFilter<'Task'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Task'> | Date | string;
  };

  export type SubtaskWhereInput = {
    AND?: SubtaskWhereInput | SubtaskWhereInput[];
    OR?: SubtaskWhereInput[];
    NOT?: SubtaskWhereInput | SubtaskWhereInput[];
    id?: StringFilter<'Subtask'> | string;
    taskId?: StringFilter<'Subtask'> | string;
    title?: StringFilter<'Subtask'> | string;
    description?: StringFilter<'Subtask'> | string;
    isCompleted?: BoolFilter<'Subtask'> | boolean;
    position?: IntFilter<'Subtask'> | number;
    createdAt?: DateTimeFilter<'Subtask'> | Date | string;
    updatedAt?: DateTimeFilter<'Subtask'> | Date | string;
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
  };

  export type SubtaskOrderByWithRelationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isCompleted?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    task?: TaskOrderByWithRelationInput;
  };

  export type SubtaskWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      taskId_position?: SubtaskTaskIdPositionCompoundUniqueInput;
      AND?: SubtaskWhereInput | SubtaskWhereInput[];
      OR?: SubtaskWhereInput[];
      NOT?: SubtaskWhereInput | SubtaskWhereInput[];
      taskId?: StringFilter<'Subtask'> | string;
      title?: StringFilter<'Subtask'> | string;
      description?: StringFilter<'Subtask'> | string;
      isCompleted?: BoolFilter<'Subtask'> | boolean;
      position?: IntFilter<'Subtask'> | number;
      createdAt?: DateTimeFilter<'Subtask'> | Date | string;
      updatedAt?: DateTimeFilter<'Subtask'> | Date | string;
      task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
    },
    'id' | 'taskId_position'
  >;

  export type SubtaskOrderByWithAggregationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isCompleted?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SubtaskCountOrderByAggregateInput;
    _avg?: SubtaskAvgOrderByAggregateInput;
    _max?: SubtaskMaxOrderByAggregateInput;
    _min?: SubtaskMinOrderByAggregateInput;
    _sum?: SubtaskSumOrderByAggregateInput;
  };

  export type SubtaskScalarWhereWithAggregatesInput = {
    AND?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[];
    OR?: SubtaskScalarWhereWithAggregatesInput[];
    NOT?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Subtask'> | string;
    taskId?: StringWithAggregatesFilter<'Subtask'> | string;
    title?: StringWithAggregatesFilter<'Subtask'> | string;
    description?: StringWithAggregatesFilter<'Subtask'> | string;
    isCompleted?: BoolWithAggregatesFilter<'Subtask'> | boolean;
    position?: IntWithAggregatesFilter<'Subtask'> | number;
    createdAt?: DateTimeWithAggregatesFilter<'Subtask'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Subtask'> | Date | string;
  };

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[];
    OR?: CommentWhereInput[];
    NOT?: CommentWhereInput | CommentWhereInput[];
    id?: StringFilter<'Comment'> | string;
    taskId?: StringFilter<'Comment'> | string;
    authorId?: StringNullableFilter<'Comment'> | string | null;
    text?: StringFilter<'Comment'> | string;
    createdAt?: DateTimeFilter<'Comment'> | Date | string;
    updatedAt?: DateTimeFilter<'Comment'> | Date | string;
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
  };

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    authorId?: SortOrderInput | SortOrder;
    text?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    task?: TaskOrderByWithRelationInput;
    author?: UserOrderByWithRelationInput;
  };

  export type CommentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: CommentWhereInput | CommentWhereInput[];
      OR?: CommentWhereInput[];
      NOT?: CommentWhereInput | CommentWhereInput[];
      taskId?: StringFilter<'Comment'> | string;
      authorId?: StringNullableFilter<'Comment'> | string | null;
      text?: StringFilter<'Comment'> | string;
      createdAt?: DateTimeFilter<'Comment'> | Date | string;
      updatedAt?: DateTimeFilter<'Comment'> | Date | string;
      task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
      author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
    },
    'id'
  >;

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    authorId?: SortOrderInput | SortOrder;
    text?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: CommentCountOrderByAggregateInput;
    _max?: CommentMaxOrderByAggregateInput;
    _min?: CommentMinOrderByAggregateInput;
  };

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[];
    OR?: CommentScalarWhereWithAggregatesInput[];
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Comment'> | string;
    taskId?: StringWithAggregatesFilter<'Comment'> | string;
    authorId?: StringNullableWithAggregatesFilter<'Comment'> | string | null;
    text?: StringWithAggregatesFilter<'Comment'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Comment'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Comment'> | Date | string;
  };

  export type TaskHistoryEventWhereInput = {
    AND?: TaskHistoryEventWhereInput | TaskHistoryEventWhereInput[];
    OR?: TaskHistoryEventWhereInput[];
    NOT?: TaskHistoryEventWhereInput | TaskHistoryEventWhereInput[];
    id?: StringFilter<'TaskHistoryEvent'> | string;
    taskId?: StringFilter<'TaskHistoryEvent'> | string;
    actorId?: StringNullableFilter<'TaskHistoryEvent'> | string | null;
    type?: EnumTaskHistoryEventTypeFilter<'TaskHistoryEvent'> | $Enums.TaskHistoryEventType;
    payload?: JsonNullableFilter<'TaskHistoryEvent'>;
    createdAt?: DateTimeFilter<'TaskHistoryEvent'> | Date | string;
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
  };

  export type TaskHistoryEventOrderByWithRelationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    actorId?: SortOrderInput | SortOrder;
    type?: SortOrder;
    payload?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    task?: TaskOrderByWithRelationInput;
    actor?: UserOrderByWithRelationInput;
  };

  export type TaskHistoryEventWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TaskHistoryEventWhereInput | TaskHistoryEventWhereInput[];
      OR?: TaskHistoryEventWhereInput[];
      NOT?: TaskHistoryEventWhereInput | TaskHistoryEventWhereInput[];
      taskId?: StringFilter<'TaskHistoryEvent'> | string;
      actorId?: StringNullableFilter<'TaskHistoryEvent'> | string | null;
      type?: EnumTaskHistoryEventTypeFilter<'TaskHistoryEvent'> | $Enums.TaskHistoryEventType;
      payload?: JsonNullableFilter<'TaskHistoryEvent'>;
      createdAt?: DateTimeFilter<'TaskHistoryEvent'> | Date | string;
      task?: XOR<TaskScalarRelationFilter, TaskWhereInput>;
      actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
    },
    'id'
  >;

  export type TaskHistoryEventOrderByWithAggregationInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    actorId?: SortOrderInput | SortOrder;
    type?: SortOrder;
    payload?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: TaskHistoryEventCountOrderByAggregateInput;
    _max?: TaskHistoryEventMaxOrderByAggregateInput;
    _min?: TaskHistoryEventMinOrderByAggregateInput;
  };

  export type TaskHistoryEventScalarWhereWithAggregatesInput = {
    AND?:
      | TaskHistoryEventScalarWhereWithAggregatesInput
      | TaskHistoryEventScalarWhereWithAggregatesInput[];
    OR?: TaskHistoryEventScalarWhereWithAggregatesInput[];
    NOT?:
      | TaskHistoryEventScalarWhereWithAggregatesInput
      | TaskHistoryEventScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'TaskHistoryEvent'> | string;
    taskId?: StringWithAggregatesFilter<'TaskHistoryEvent'> | string;
    actorId?: StringNullableWithAggregatesFilter<'TaskHistoryEvent'> | string | null;
    type?:
      | EnumTaskHistoryEventTypeWithAggregatesFilter<'TaskHistoryEvent'>
      | $Enums.TaskHistoryEventType;
    payload?: JsonNullableWithAggregatesFilter<'TaskHistoryEvent'>;
    createdAt?: DateTimeWithAggregatesFilter<'TaskHistoryEvent'> | Date | string;
  };

  export type PasswordCredentialCreateInput = {
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutPasswordCredentialInput;
  };

  export type PasswordCredentialUncheckedCreateInput = {
    userId: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PasswordCredentialUpdateInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutPasswordCredentialNestedInput;
  };

  export type PasswordCredentialUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PasswordCredentialCreateManyInput = {
    userId: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PasswordCredentialUpdateManyMutationInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PasswordCredentialUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialCreateNestedOneWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberCreateNestedManyWithoutUserInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutActorInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialUncheckedCreateNestedOneWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberUncheckedCreateNestedManyWithoutUserInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUpdateOneWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUpdateManyWithoutUserNestedInput;
    comments?: CommentUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutActorNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUncheckedUpdateManyWithoutUserNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardCreateInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: BoardMemberCreateNestedManyWithoutBoardInput;
    columns?: ColumnCreateNestedManyWithoutBoardInput;
  };

  export type BoardUncheckedCreateInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: BoardMemberUncheckedCreateNestedManyWithoutBoardInput;
    columns?: ColumnUncheckedCreateNestedManyWithoutBoardInput;
  };

  export type BoardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: BoardMemberUpdateManyWithoutBoardNestedInput;
    columns?: ColumnUpdateManyWithoutBoardNestedInput;
  };

  export type BoardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: BoardMemberUncheckedUpdateManyWithoutBoardNestedInput;
    columns?: ColumnUncheckedUpdateManyWithoutBoardNestedInput;
  };

  export type BoardCreateManyInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberCreateInput = {
    id?: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    board: BoardCreateNestedOneWithoutMembersInput;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type BoardMemberUncheckedCreateInput = {
    id?: string;
    boardId: string;
    userId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    board?: BoardUpdateOneRequiredWithoutMembersNestedInput;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type BoardMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberCreateManyInput = {
    id?: string;
    boardId: string;
    userId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ColumnCreateInput = {
    id?: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    board: BoardCreateNestedOneWithoutColumnsInput;
    tasks?: TaskCreateNestedManyWithoutColumnInput;
  };

  export type ColumnUncheckedCreateInput = {
    id?: string;
    boardId: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tasks?: TaskUncheckedCreateNestedManyWithoutColumnInput;
  };

  export type ColumnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    board?: BoardUpdateOneRequiredWithoutColumnsNestedInput;
    tasks?: TaskUpdateManyWithoutColumnNestedInput;
  };

  export type ColumnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: TaskUncheckedUpdateManyWithoutColumnNestedInput;
  };

  export type ColumnCreateManyInput = {
    id?: string;
    boardId: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ColumnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ColumnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskCreateInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    column: ColumnCreateNestedOneWithoutTasksInput;
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput;
    comments?: CommentCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutTaskInput;
  };

  export type TaskUncheckedCreateInput = {
    id?: string;
    columnId: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput;
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutTaskInput;
  };

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    column?: ColumnUpdateOneRequiredWithoutTasksNestedInput;
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput;
    comments?: CommentUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    columnId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutTaskNestedInput;
  };

  export type TaskCreateManyInput = {
    id?: string;
    columnId: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    columnId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskCreateInput = {
    id?: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    task: TaskCreateNestedOneWithoutSubtasksInput;
  };

  export type SubtaskUncheckedCreateInput = {
    id?: string;
    taskId: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubtaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput;
  };

  export type SubtaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskCreateManyInput = {
    id?: string;
    taskId: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubtaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentCreateInput = {
    id?: string;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    task: TaskCreateNestedOneWithoutCommentsInput;
    author?: UserCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateInput = {
    id?: string;
    taskId: string;
    authorId?: string | null;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput;
    author?: UserUpdateOneWithoutCommentsNestedInput;
  };

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableStringFieldUpdateOperationsInput | string | null;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentCreateManyInput = {
    id?: string;
    taskId: string;
    authorId?: string | null;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableStringFieldUpdateOperationsInput | string | null;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventCreateInput = {
    id?: string;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    task: TaskCreateNestedOneWithoutHistoryEventsInput;
    actor?: UserCreateNestedOneWithoutHistoryEventsInput;
  };

  export type TaskHistoryEventUncheckedCreateInput = {
    id?: string;
    taskId: string;
    actorId?: string | null;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TaskHistoryEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    task?: TaskUpdateOneRequiredWithoutHistoryEventsNestedInput;
    actor?: UserUpdateOneWithoutHistoryEventsNestedInput;
  };

  export type TaskHistoryEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    actorId?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventCreateManyInput = {
    id?: string;
    taskId: string;
    actorId?: string | null;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TaskHistoryEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    actorId?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type PasswordCredentialCountOrderByAggregateInput = {
    userId?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PasswordCredentialMaxOrderByAggregateInput = {
    userId?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PasswordCredentialMinOrderByAggregateInput = {
    userId?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    tokenHash?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type PasswordCredentialNullableScalarRelationFilter = {
    is?: PasswordCredentialWhereInput | null;
    isNot?: PasswordCredentialWhereInput | null;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type BoardMemberListRelationFilter = {
    every?: BoardMemberWhereInput;
    some?: BoardMemberWhereInput;
    none?: BoardMemberWhereInput;
  };

  export type CommentListRelationFilter = {
    every?: CommentWhereInput;
    some?: CommentWhereInput;
    none?: CommentWhereInput;
  };

  export type TaskHistoryEventListRelationFilter = {
    every?: TaskHistoryEventWhereInput;
    some?: TaskHistoryEventWhereInput;
    none?: TaskHistoryEventWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type BoardMemberOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TaskHistoryEventOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type ColumnListRelationFilter = {
    every?: ColumnWhereInput;
    some?: ColumnWhereInput;
    none?: ColumnWhereInput;
  };

  export type ColumnOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type BoardCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoardMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoardMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumBoardMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardMemberRole | EnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumBoardMemberRoleFilter<$PrismaModel> | $Enums.BoardMemberRole;
  };

  export type BoardScalarRelationFilter = {
    is?: BoardWhereInput;
    isNot?: BoardWhereInput;
  };

  export type BoardMemberBoardIdUserIdCompoundUniqueInput = {
    boardId: string;
    userId: string;
  };

  export type BoardMemberCountOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoardMemberMaxOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoardMemberMinOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    userId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumBoardMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardMemberRole | EnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumBoardMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.BoardMemberRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumBoardMemberRoleFilter<$PrismaModel>;
    _max?: NestedEnumBoardMemberRoleFilter<$PrismaModel>;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type TaskListRelationFilter = {
    every?: TaskWhereInput;
    some?: TaskWhereInput;
    none?: TaskWhereInput;
  };

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ColumnBoardIdPositionCompoundUniqueInput = {
    boardId: string;
    position: number;
  };

  export type ColumnCountOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    title?: SortOrder;
    position?: SortOrder;
    isCompleted?: SortOrder;
    isArchive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ColumnAvgOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type ColumnMaxOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    title?: SortOrder;
    position?: SortOrder;
    isCompleted?: SortOrder;
    isArchive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ColumnMinOrderByAggregateInput = {
    id?: SortOrder;
    boardId?: SortOrder;
    title?: SortOrder;
    position?: SortOrder;
    isCompleted?: SortOrder;
    isArchive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ColumnSumOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type ColumnScalarRelationFilter = {
    is?: ColumnWhereInput;
    isNot?: ColumnWhereInput;
  };

  export type SubtaskListRelationFilter = {
    every?: SubtaskWhereInput;
    some?: SubtaskWhereInput;
    none?: SubtaskWhereInput;
  };

  export type SubtaskOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TaskColumnIdPositionCompoundUniqueInput = {
    columnId: string;
    position: number;
  };

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder;
    columnId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    priority?: SortOrder;
    tags?: SortOrder;
    dueDate?: SortOrder;
    archivedAt?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TaskAvgOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder;
    columnId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    priority?: SortOrder;
    dueDate?: SortOrder;
    archivedAt?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder;
    columnId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    priority?: SortOrder;
    dueDate?: SortOrder;
    archivedAt?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type TaskSumOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type EnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>;
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput;
    isNot?: TaskWhereInput;
  };

  export type SubtaskTaskIdPositionCompoundUniqueInput = {
    taskId: string;
    position: number;
  };

  export type SubtaskCountOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isCompleted?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubtaskAvgOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type SubtaskMaxOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isCompleted?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubtaskMinOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    isCompleted?: SortOrder;
    position?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SubtaskSumOrderByAggregateInput = {
    position?: SortOrder;
  };

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    authorId?: SortOrder;
    text?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    authorId?: SortOrder;
    text?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    authorId?: SortOrder;
    text?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumTaskHistoryEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryEventType | EnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel> | $Enums.TaskHistoryEventType;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type TaskHistoryEventCountOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    actorId?: SortOrder;
    type?: SortOrder;
    payload?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TaskHistoryEventMaxOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    actorId?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TaskHistoryEventMinOrderByAggregateInput = {
    id?: SortOrder;
    taskId?: SortOrder;
    actorId?: SortOrder;
    type?: SortOrder;
    createdAt?: SortOrder;
  };

  export type EnumTaskHistoryEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryEventType | EnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTaskHistoryEventTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.TaskHistoryEventType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel>;
    _max?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type UserCreateNestedOneWithoutPasswordCredentialInput = {
    create?: XOR<
      UserCreateWithoutPasswordCredentialInput,
      UserUncheckedCreateWithoutPasswordCredentialInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPasswordCredentialInput;
    connect?: UserWhereUniqueInput;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateOneRequiredWithoutPasswordCredentialNestedInput = {
    create?: XOR<
      UserCreateWithoutPasswordCredentialInput,
      UserUncheckedCreateWithoutPasswordCredentialInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPasswordCredentialInput;
    upsert?: UserUpsertWithoutPasswordCredentialInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutPasswordCredentialInput,
        UserUpdateWithoutPasswordCredentialInput
      >,
      UserUncheckedUpdateWithoutPasswordCredentialInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type PasswordCredentialCreateNestedOneWithoutUserInput = {
    create?: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: PasswordCredentialCreateOrConnectWithoutUserInput;
    connect?: PasswordCredentialWhereUniqueInput;
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type BoardMemberCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>
      | BoardMemberCreateWithoutUserInput[]
      | BoardMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutUserInput | BoardMemberCreateOrConnectWithoutUserInput[];
    createMany?: BoardMemberCreateManyUserInputEnvelope;
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
  };

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
      | CommentCreateWithoutAuthorInput[]
      | CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[];
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
  };

  export type TaskHistoryEventCreateNestedManyWithoutActorInput = {
    create?:
      | XOR<
          TaskHistoryEventCreateWithoutActorInput,
          TaskHistoryEventUncheckedCreateWithoutActorInput
        >
      | TaskHistoryEventCreateWithoutActorInput[]
      | TaskHistoryEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutActorInput
      | TaskHistoryEventCreateOrConnectWithoutActorInput[];
    createMany?: TaskHistoryEventCreateManyActorInputEnvelope;
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
  };

  export type PasswordCredentialUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: PasswordCredentialCreateOrConnectWithoutUserInput;
    connect?: PasswordCredentialWhereUniqueInput;
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type BoardMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>
      | BoardMemberCreateWithoutUserInput[]
      | BoardMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutUserInput | BoardMemberCreateOrConnectWithoutUserInput[];
    createMany?: BoardMemberCreateManyUserInputEnvelope;
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
  };

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
      | CommentCreateWithoutAuthorInput[]
      | CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[];
    createMany?: CommentCreateManyAuthorInputEnvelope;
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
  };

  export type TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput = {
    create?:
      | XOR<
          TaskHistoryEventCreateWithoutActorInput,
          TaskHistoryEventUncheckedCreateWithoutActorInput
        >
      | TaskHistoryEventCreateWithoutActorInput[]
      | TaskHistoryEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutActorInput
      | TaskHistoryEventCreateOrConnectWithoutActorInput[];
    createMany?: TaskHistoryEventCreateManyActorInputEnvelope;
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type PasswordCredentialUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: PasswordCredentialCreateOrConnectWithoutUserInput;
    upsert?: PasswordCredentialUpsertWithoutUserInput;
    disconnect?: PasswordCredentialWhereInput | boolean;
    delete?: PasswordCredentialWhereInput | boolean;
    connect?: PasswordCredentialWhereUniqueInput;
    update?: XOR<
      XOR<
        PasswordCredentialUpdateToOneWithWhereWithoutUserInput,
        PasswordCredentialUpdateWithoutUserInput
      >,
      PasswordCredentialUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type BoardMemberUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>
      | BoardMemberCreateWithoutUserInput[]
      | BoardMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutUserInput | BoardMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | BoardMemberUpsertWithWhereUniqueWithoutUserInput
      | BoardMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: BoardMemberCreateManyUserInputEnvelope;
    set?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    disconnect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    delete?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    update?:
      | BoardMemberUpdateWithWhereUniqueWithoutUserInput
      | BoardMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | BoardMemberUpdateManyWithWhereWithoutUserInput
      | BoardMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
  };

  export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
      | CommentCreateWithoutAuthorInput[]
      | CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | CommentUpsertWithWhereUniqueWithoutAuthorInput
      | CommentUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: CommentCreateManyAuthorInputEnvelope;
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    update?:
      | CommentUpdateWithWhereUniqueWithoutAuthorInput
      | CommentUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[];
  };

  export type TaskHistoryEventUpdateManyWithoutActorNestedInput = {
    create?:
      | XOR<
          TaskHistoryEventCreateWithoutActorInput,
          TaskHistoryEventUncheckedCreateWithoutActorInput
        >
      | TaskHistoryEventCreateWithoutActorInput[]
      | TaskHistoryEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutActorInput
      | TaskHistoryEventCreateOrConnectWithoutActorInput[];
    upsert?:
      | TaskHistoryEventUpsertWithWhereUniqueWithoutActorInput
      | TaskHistoryEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: TaskHistoryEventCreateManyActorInputEnvelope;
    set?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    disconnect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    delete?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    update?:
      | TaskHistoryEventUpdateWithWhereUniqueWithoutActorInput
      | TaskHistoryEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?:
      | TaskHistoryEventUpdateManyWithWhereWithoutActorInput
      | TaskHistoryEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
  };

  export type PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: PasswordCredentialCreateOrConnectWithoutUserInput;
    upsert?: PasswordCredentialUpsertWithoutUserInput;
    disconnect?: PasswordCredentialWhereInput | boolean;
    delete?: PasswordCredentialWhereInput | boolean;
    connect?: PasswordCredentialWhereUniqueInput;
    update?: XOR<
      XOR<
        PasswordCredentialUpdateToOneWithWhereWithoutUserInput,
        PasswordCredentialUpdateWithoutUserInput
      >,
      PasswordCredentialUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type BoardMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>
      | BoardMemberCreateWithoutUserInput[]
      | BoardMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutUserInput | BoardMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | BoardMemberUpsertWithWhereUniqueWithoutUserInput
      | BoardMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: BoardMemberCreateManyUserInputEnvelope;
    set?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    disconnect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    delete?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    update?:
      | BoardMemberUpdateWithWhereUniqueWithoutUserInput
      | BoardMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | BoardMemberUpdateManyWithWhereWithoutUserInput
      | BoardMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
  };

  export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
      | CommentCreateWithoutAuthorInput[]
      | CommentUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | CommentUpsertWithWhereUniqueWithoutAuthorInput
      | CommentUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: CommentCreateManyAuthorInputEnvelope;
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    update?:
      | CommentUpdateWithWhereUniqueWithoutAuthorInput
      | CommentUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[];
  };

  export type TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?:
      | XOR<
          TaskHistoryEventCreateWithoutActorInput,
          TaskHistoryEventUncheckedCreateWithoutActorInput
        >
      | TaskHistoryEventCreateWithoutActorInput[]
      | TaskHistoryEventUncheckedCreateWithoutActorInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutActorInput
      | TaskHistoryEventCreateOrConnectWithoutActorInput[];
    upsert?:
      | TaskHistoryEventUpsertWithWhereUniqueWithoutActorInput
      | TaskHistoryEventUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: TaskHistoryEventCreateManyActorInputEnvelope;
    set?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    disconnect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    delete?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    update?:
      | TaskHistoryEventUpdateWithWhereUniqueWithoutActorInput
      | TaskHistoryEventUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?:
      | TaskHistoryEventUpdateManyWithWhereWithoutActorInput
      | TaskHistoryEventUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
  };

  export type BoardMemberCreateNestedManyWithoutBoardInput = {
    create?:
      | XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>
      | BoardMemberCreateWithoutBoardInput[]
      | BoardMemberUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutBoardInput | BoardMemberCreateOrConnectWithoutBoardInput[];
    createMany?: BoardMemberCreateManyBoardInputEnvelope;
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
  };

  export type ColumnCreateNestedManyWithoutBoardInput = {
    create?:
      | XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>
      | ColumnCreateWithoutBoardInput[]
      | ColumnUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      ColumnCreateOrConnectWithoutBoardInput | ColumnCreateOrConnectWithoutBoardInput[];
    createMany?: ColumnCreateManyBoardInputEnvelope;
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
  };

  export type BoardMemberUncheckedCreateNestedManyWithoutBoardInput = {
    create?:
      | XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>
      | BoardMemberCreateWithoutBoardInput[]
      | BoardMemberUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutBoardInput | BoardMemberCreateOrConnectWithoutBoardInput[];
    createMany?: BoardMemberCreateManyBoardInputEnvelope;
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
  };

  export type ColumnUncheckedCreateNestedManyWithoutBoardInput = {
    create?:
      | XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>
      | ColumnCreateWithoutBoardInput[]
      | ColumnUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      ColumnCreateOrConnectWithoutBoardInput | ColumnCreateOrConnectWithoutBoardInput[];
    createMany?: ColumnCreateManyBoardInputEnvelope;
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
  };

  export type BoardMemberUpdateManyWithoutBoardNestedInput = {
    create?:
      | XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>
      | BoardMemberCreateWithoutBoardInput[]
      | BoardMemberUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutBoardInput | BoardMemberCreateOrConnectWithoutBoardInput[];
    upsert?:
      | BoardMemberUpsertWithWhereUniqueWithoutBoardInput
      | BoardMemberUpsertWithWhereUniqueWithoutBoardInput[];
    createMany?: BoardMemberCreateManyBoardInputEnvelope;
    set?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    disconnect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    delete?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    update?:
      | BoardMemberUpdateWithWhereUniqueWithoutBoardInput
      | BoardMemberUpdateWithWhereUniqueWithoutBoardInput[];
    updateMany?:
      | BoardMemberUpdateManyWithWhereWithoutBoardInput
      | BoardMemberUpdateManyWithWhereWithoutBoardInput[];
    deleteMany?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
  };

  export type ColumnUpdateManyWithoutBoardNestedInput = {
    create?:
      | XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>
      | ColumnCreateWithoutBoardInput[]
      | ColumnUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      ColumnCreateOrConnectWithoutBoardInput | ColumnCreateOrConnectWithoutBoardInput[];
    upsert?:
      ColumnUpsertWithWhereUniqueWithoutBoardInput | ColumnUpsertWithWhereUniqueWithoutBoardInput[];
    createMany?: ColumnCreateManyBoardInputEnvelope;
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    update?:
      ColumnUpdateWithWhereUniqueWithoutBoardInput | ColumnUpdateWithWhereUniqueWithoutBoardInput[];
    updateMany?:
      ColumnUpdateManyWithWhereWithoutBoardInput | ColumnUpdateManyWithWhereWithoutBoardInput[];
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[];
  };

  export type BoardMemberUncheckedUpdateManyWithoutBoardNestedInput = {
    create?:
      | XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>
      | BoardMemberCreateWithoutBoardInput[]
      | BoardMemberUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      BoardMemberCreateOrConnectWithoutBoardInput | BoardMemberCreateOrConnectWithoutBoardInput[];
    upsert?:
      | BoardMemberUpsertWithWhereUniqueWithoutBoardInput
      | BoardMemberUpsertWithWhereUniqueWithoutBoardInput[];
    createMany?: BoardMemberCreateManyBoardInputEnvelope;
    set?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    disconnect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    delete?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    connect?: BoardMemberWhereUniqueInput | BoardMemberWhereUniqueInput[];
    update?:
      | BoardMemberUpdateWithWhereUniqueWithoutBoardInput
      | BoardMemberUpdateWithWhereUniqueWithoutBoardInput[];
    updateMany?:
      | BoardMemberUpdateManyWithWhereWithoutBoardInput
      | BoardMemberUpdateManyWithWhereWithoutBoardInput[];
    deleteMany?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
  };

  export type ColumnUncheckedUpdateManyWithoutBoardNestedInput = {
    create?:
      | XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>
      | ColumnCreateWithoutBoardInput[]
      | ColumnUncheckedCreateWithoutBoardInput[];
    connectOrCreate?:
      ColumnCreateOrConnectWithoutBoardInput | ColumnCreateOrConnectWithoutBoardInput[];
    upsert?:
      ColumnUpsertWithWhereUniqueWithoutBoardInput | ColumnUpsertWithWhereUniqueWithoutBoardInput[];
    createMany?: ColumnCreateManyBoardInputEnvelope;
    set?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    disconnect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    delete?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    connect?: ColumnWhereUniqueInput | ColumnWhereUniqueInput[];
    update?:
      ColumnUpdateWithWhereUniqueWithoutBoardInput | ColumnUpdateWithWhereUniqueWithoutBoardInput[];
    updateMany?:
      ColumnUpdateManyWithWhereWithoutBoardInput | ColumnUpdateManyWithWhereWithoutBoardInput[];
    deleteMany?: ColumnScalarWhereInput | ColumnScalarWhereInput[];
  };

  export type BoardCreateNestedOneWithoutMembersInput = {
    create?: XOR<BoardCreateWithoutMembersInput, BoardUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: BoardCreateOrConnectWithoutMembersInput;
    connect?: BoardWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumBoardMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.BoardMemberRole;
  };

  export type BoardUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<BoardCreateWithoutMembersInput, BoardUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: BoardCreateOrConnectWithoutMembersInput;
    upsert?: BoardUpsertWithoutMembersInput;
    connect?: BoardWhereUniqueInput;
    update?: XOR<
      XOR<BoardUpdateToOneWithWhereWithoutMembersInput, BoardUpdateWithoutMembersInput>,
      BoardUncheckedUpdateWithoutMembersInput
    >;
  };

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    upsert?: UserUpsertWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
  };

  export type BoardCreateNestedOneWithoutColumnsInput = {
    create?: XOR<BoardCreateWithoutColumnsInput, BoardUncheckedCreateWithoutColumnsInput>;
    connectOrCreate?: BoardCreateOrConnectWithoutColumnsInput;
    connect?: BoardWhereUniqueInput;
  };

  export type TaskCreateNestedManyWithoutColumnInput = {
    create?:
      | XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
      | TaskCreateWithoutColumnInput[]
      | TaskUncheckedCreateWithoutColumnInput[];
    connectOrCreate?:
      TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[];
    createMany?: TaskCreateManyColumnInputEnvelope;
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
  };

  export type TaskUncheckedCreateNestedManyWithoutColumnInput = {
    create?:
      | XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
      | TaskCreateWithoutColumnInput[]
      | TaskUncheckedCreateWithoutColumnInput[];
    connectOrCreate?:
      TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[];
    createMany?: TaskCreateManyColumnInputEnvelope;
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type BoardUpdateOneRequiredWithoutColumnsNestedInput = {
    create?: XOR<BoardCreateWithoutColumnsInput, BoardUncheckedCreateWithoutColumnsInput>;
    connectOrCreate?: BoardCreateOrConnectWithoutColumnsInput;
    upsert?: BoardUpsertWithoutColumnsInput;
    connect?: BoardWhereUniqueInput;
    update?: XOR<
      XOR<BoardUpdateToOneWithWhereWithoutColumnsInput, BoardUpdateWithoutColumnsInput>,
      BoardUncheckedUpdateWithoutColumnsInput
    >;
  };

  export type TaskUpdateManyWithoutColumnNestedInput = {
    create?:
      | XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
      | TaskCreateWithoutColumnInput[]
      | TaskUncheckedCreateWithoutColumnInput[];
    connectOrCreate?:
      TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[];
    upsert?:
      TaskUpsertWithWhereUniqueWithoutColumnInput | TaskUpsertWithWhereUniqueWithoutColumnInput[];
    createMany?: TaskCreateManyColumnInputEnvelope;
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    update?:
      TaskUpdateWithWhereUniqueWithoutColumnInput | TaskUpdateWithWhereUniqueWithoutColumnInput[];
    updateMany?:
      TaskUpdateManyWithWhereWithoutColumnInput | TaskUpdateManyWithWhereWithoutColumnInput[];
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[];
  };

  export type TaskUncheckedUpdateManyWithoutColumnNestedInput = {
    create?:
      | XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
      | TaskCreateWithoutColumnInput[]
      | TaskUncheckedCreateWithoutColumnInput[];
    connectOrCreate?:
      TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[];
    upsert?:
      TaskUpsertWithWhereUniqueWithoutColumnInput | TaskUpsertWithWhereUniqueWithoutColumnInput[];
    createMany?: TaskCreateManyColumnInputEnvelope;
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[];
    update?:
      TaskUpdateWithWhereUniqueWithoutColumnInput | TaskUpdateWithWhereUniqueWithoutColumnInput[];
    updateMany?:
      TaskUpdateManyWithWhereWithoutColumnInput | TaskUpdateManyWithWhereWithoutColumnInput[];
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[];
  };

  export type TaskCreatetagsInput = {
    set: string[];
  };

  export type ColumnCreateNestedOneWithoutTasksInput = {
    create?: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: ColumnCreateOrConnectWithoutTasksInput;
    connect?: ColumnWhereUniqueInput;
  };

  export type SubtaskCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
      | SubtaskCreateWithoutTaskInput[]
      | SubtaskUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[];
    createMany?: SubtaskCreateManyTaskInputEnvelope;
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
  };

  export type CommentCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
      | CommentCreateWithoutTaskInput[]
      | CommentUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[];
    createMany?: CommentCreateManyTaskInputEnvelope;
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
  };

  export type TaskHistoryEventCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<TaskHistoryEventCreateWithoutTaskInput, TaskHistoryEventUncheckedCreateWithoutTaskInput>
      | TaskHistoryEventCreateWithoutTaskInput[]
      | TaskHistoryEventUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutTaskInput
      | TaskHistoryEventCreateOrConnectWithoutTaskInput[];
    createMany?: TaskHistoryEventCreateManyTaskInputEnvelope;
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
  };

  export type SubtaskUncheckedCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
      | SubtaskCreateWithoutTaskInput[]
      | SubtaskUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[];
    createMany?: SubtaskCreateManyTaskInputEnvelope;
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
  };

  export type CommentUncheckedCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
      | CommentCreateWithoutTaskInput[]
      | CommentUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[];
    createMany?: CommentCreateManyTaskInputEnvelope;
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
  };

  export type TaskHistoryEventUncheckedCreateNestedManyWithoutTaskInput = {
    create?:
      | XOR<TaskHistoryEventCreateWithoutTaskInput, TaskHistoryEventUncheckedCreateWithoutTaskInput>
      | TaskHistoryEventCreateWithoutTaskInput[]
      | TaskHistoryEventUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutTaskInput
      | TaskHistoryEventCreateOrConnectWithoutTaskInput[];
    createMany?: TaskHistoryEventCreateManyTaskInputEnvelope;
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
  };

  export type EnumTaskPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TaskPriority;
  };

  export type TaskUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type ColumnUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>;
    connectOrCreate?: ColumnCreateOrConnectWithoutTasksInput;
    upsert?: ColumnUpsertWithoutTasksInput;
    connect?: ColumnWhereUniqueInput;
    update?: XOR<
      XOR<ColumnUpdateToOneWithWhereWithoutTasksInput, ColumnUpdateWithoutTasksInput>,
      ColumnUncheckedUpdateWithoutTasksInput
    >;
  };

  export type SubtaskUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
      | SubtaskCreateWithoutTaskInput[]
      | SubtaskUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[];
    upsert?:
      SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: SubtaskCreateManyTaskInputEnvelope;
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    update?:
      SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[];
  };

  export type CommentUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
      | CommentCreateWithoutTaskInput[]
      | CommentUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[];
    upsert?:
      CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: CommentCreateManyTaskInputEnvelope;
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    update?:
      CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[];
  };

  export type TaskHistoryEventUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<TaskHistoryEventCreateWithoutTaskInput, TaskHistoryEventUncheckedCreateWithoutTaskInput>
      | TaskHistoryEventCreateWithoutTaskInput[]
      | TaskHistoryEventUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutTaskInput
      | TaskHistoryEventCreateOrConnectWithoutTaskInput[];
    upsert?:
      | TaskHistoryEventUpsertWithWhereUniqueWithoutTaskInput
      | TaskHistoryEventUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: TaskHistoryEventCreateManyTaskInputEnvelope;
    set?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    disconnect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    delete?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    update?:
      | TaskHistoryEventUpdateWithWhereUniqueWithoutTaskInput
      | TaskHistoryEventUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      | TaskHistoryEventUpdateManyWithWhereWithoutTaskInput
      | TaskHistoryEventUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
  };

  export type SubtaskUncheckedUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
      | SubtaskCreateWithoutTaskInput[]
      | SubtaskUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[];
    upsert?:
      SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: SubtaskCreateManyTaskInputEnvelope;
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[];
    update?:
      SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[];
  };

  export type CommentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
      | CommentCreateWithoutTaskInput[]
      | CommentUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[];
    upsert?:
      CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: CommentCreateManyTaskInputEnvelope;
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[];
    update?:
      CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[];
  };

  export type TaskHistoryEventUncheckedUpdateManyWithoutTaskNestedInput = {
    create?:
      | XOR<TaskHistoryEventCreateWithoutTaskInput, TaskHistoryEventUncheckedCreateWithoutTaskInput>
      | TaskHistoryEventCreateWithoutTaskInput[]
      | TaskHistoryEventUncheckedCreateWithoutTaskInput[];
    connectOrCreate?:
      | TaskHistoryEventCreateOrConnectWithoutTaskInput
      | TaskHistoryEventCreateOrConnectWithoutTaskInput[];
    upsert?:
      | TaskHistoryEventUpsertWithWhereUniqueWithoutTaskInput
      | TaskHistoryEventUpsertWithWhereUniqueWithoutTaskInput[];
    createMany?: TaskHistoryEventCreateManyTaskInputEnvelope;
    set?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    disconnect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    delete?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    connect?: TaskHistoryEventWhereUniqueInput | TaskHistoryEventWhereUniqueInput[];
    update?:
      | TaskHistoryEventUpdateWithWhereUniqueWithoutTaskInput
      | TaskHistoryEventUpdateWithWhereUniqueWithoutTaskInput[];
    updateMany?:
      | TaskHistoryEventUpdateManyWithWhereWithoutTaskInput
      | TaskHistoryEventUpdateManyWithWhereWithoutTaskInput[];
    deleteMany?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
  };

  export type TaskCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput;
    connect?: TaskWhereUniqueInput;
  };

  export type TaskUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput;
    upsert?: TaskUpsertWithoutSubtasksInput;
    connect?: TaskWhereUniqueInput;
    update?: XOR<
      XOR<TaskUpdateToOneWithWhereWithoutSubtasksInput, TaskUpdateWithoutSubtasksInput>,
      TaskUncheckedUpdateWithoutSubtasksInput
    >;
  };

  export type TaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput;
    connect?: TaskWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;
    connect?: UserWhereUniqueInput;
  };

  export type TaskUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput;
    upsert?: TaskUpsertWithoutCommentsInput;
    connect?: TaskWhereUniqueInput;
    update?: XOR<
      XOR<TaskUpdateToOneWithWhereWithoutCommentsInput, TaskUpdateWithoutCommentsInput>,
      TaskUncheckedUpdateWithoutCommentsInput
    >;
  };

  export type UserUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;
    upsert?: UserUpsertWithoutCommentsInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>,
      UserUncheckedUpdateWithoutCommentsInput
    >;
  };

  export type TaskCreateNestedOneWithoutHistoryEventsInput = {
    create?: XOR<TaskCreateWithoutHistoryEventsInput, TaskUncheckedCreateWithoutHistoryEventsInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutHistoryEventsInput;
    connect?: TaskWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutHistoryEventsInput = {
    create?: XOR<UserCreateWithoutHistoryEventsInput, UserUncheckedCreateWithoutHistoryEventsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutHistoryEventsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumTaskHistoryEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskHistoryEventType;
  };

  export type TaskUpdateOneRequiredWithoutHistoryEventsNestedInput = {
    create?: XOR<TaskCreateWithoutHistoryEventsInput, TaskUncheckedCreateWithoutHistoryEventsInput>;
    connectOrCreate?: TaskCreateOrConnectWithoutHistoryEventsInput;
    upsert?: TaskUpsertWithoutHistoryEventsInput;
    connect?: TaskWhereUniqueInput;
    update?: XOR<
      XOR<TaskUpdateToOneWithWhereWithoutHistoryEventsInput, TaskUpdateWithoutHistoryEventsInput>,
      TaskUncheckedUpdateWithoutHistoryEventsInput
    >;
  };

  export type UserUpdateOneWithoutHistoryEventsNestedInput = {
    create?: XOR<UserCreateWithoutHistoryEventsInput, UserUncheckedCreateWithoutHistoryEventsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutHistoryEventsInput;
    upsert?: UserUpsertWithoutHistoryEventsInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutHistoryEventsInput, UserUpdateWithoutHistoryEventsInput>,
      UserUncheckedUpdateWithoutHistoryEventsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumBoardMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardMemberRole | EnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumBoardMemberRoleFilter<$PrismaModel> | $Enums.BoardMemberRole;
  };

  export type NestedEnumBoardMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BoardMemberRole | EnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BoardMemberRole[] | ListEnumBoardMemberRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumBoardMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.BoardMemberRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumBoardMemberRoleFilter<$PrismaModel>;
    _max?: NestedEnumBoardMemberRoleFilter<$PrismaModel>;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>;
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedEnumTaskHistoryEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryEventType | EnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel> | $Enums.TaskHistoryEventType;
  };

  export type NestedEnumTaskHistoryEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskHistoryEventType | EnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TaskHistoryEventType[] | ListEnumTaskHistoryEventTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTaskHistoryEventTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.TaskHistoryEventType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel>;
    _max?: NestedEnumTaskHistoryEventTypeFilter<$PrismaModel>;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type UserCreateWithoutPasswordCredentialInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberCreateNestedManyWithoutUserInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutActorInput;
  };

  export type UserUncheckedCreateWithoutPasswordCredentialInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberUncheckedCreateNestedManyWithoutUserInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput;
  };

  export type UserCreateOrConnectWithoutPasswordCredentialInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutPasswordCredentialInput,
      UserUncheckedCreateWithoutPasswordCredentialInput
    >;
  };

  export type UserUpsertWithoutPasswordCredentialInput = {
    update: XOR<
      UserUpdateWithoutPasswordCredentialInput,
      UserUncheckedUpdateWithoutPasswordCredentialInput
    >;
    create: XOR<
      UserCreateWithoutPasswordCredentialInput,
      UserUncheckedCreateWithoutPasswordCredentialInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutPasswordCredentialInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutPasswordCredentialInput,
      UserUncheckedUpdateWithoutPasswordCredentialInput
    >;
  };

  export type UserUpdateWithoutPasswordCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUpdateManyWithoutUserNestedInput;
    comments?: CommentUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutActorNestedInput;
  };

  export type UserUncheckedUpdateWithoutPasswordCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUncheckedUpdateManyWithoutUserNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialCreateNestedOneWithoutUserInput;
    memberships?: BoardMemberCreateNestedManyWithoutUserInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutActorInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialUncheckedCreateNestedOneWithoutUserInput;
    memberships?: BoardMemberUncheckedCreateNestedManyWithoutUserInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUpdateOneWithoutUserNestedInput;
    memberships?: BoardMemberUpdateManyWithoutUserNestedInput;
    comments?: CommentUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutActorNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput;
    memberships?: BoardMemberUncheckedUpdateManyWithoutUserNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput;
  };

  export type PasswordCredentialCreateWithoutUserInput = {
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PasswordCredentialUncheckedCreateWithoutUserInput = {
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PasswordCredentialCreateOrConnectWithoutUserInput = {
    where: PasswordCredentialWhereUniqueInput;
    create: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type BoardMemberCreateWithoutUserInput = {
    id?: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    board: BoardCreateNestedOneWithoutMembersInput;
  };

  export type BoardMemberUncheckedCreateWithoutUserInput = {
    id?: string;
    boardId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardMemberCreateOrConnectWithoutUserInput = {
    where: BoardMemberWhereUniqueInput;
    create: XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>;
  };

  export type BoardMemberCreateManyUserInputEnvelope = {
    data: BoardMemberCreateManyUserInput | BoardMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type CommentCreateWithoutAuthorInput = {
    id?: string;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    task: TaskCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: string;
    taskId: string;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>;
  };

  export type CommentCreateManyAuthorInputEnvelope = {
    data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[];
    skipDuplicates?: boolean;
  };

  export type TaskHistoryEventCreateWithoutActorInput = {
    id?: string;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    task: TaskCreateNestedOneWithoutHistoryEventsInput;
  };

  export type TaskHistoryEventUncheckedCreateWithoutActorInput = {
    id?: string;
    taskId: string;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TaskHistoryEventCreateOrConnectWithoutActorInput = {
    where: TaskHistoryEventWhereUniqueInput;
    create: XOR<
      TaskHistoryEventCreateWithoutActorInput,
      TaskHistoryEventUncheckedCreateWithoutActorInput
    >;
  };

  export type TaskHistoryEventCreateManyActorInputEnvelope = {
    data: TaskHistoryEventCreateManyActorInput | TaskHistoryEventCreateManyActorInput[];
    skipDuplicates?: boolean;
  };

  export type PasswordCredentialUpsertWithoutUserInput = {
    update: XOR<
      PasswordCredentialUpdateWithoutUserInput,
      PasswordCredentialUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      PasswordCredentialCreateWithoutUserInput,
      PasswordCredentialUncheckedCreateWithoutUserInput
    >;
    where?: PasswordCredentialWhereInput;
  };

  export type PasswordCredentialUpdateToOneWithWhereWithoutUserInput = {
    where?: PasswordCredentialWhereInput;
    data: XOR<
      PasswordCredentialUpdateWithoutUserInput,
      PasswordCredentialUncheckedUpdateWithoutUserInput
    >;
  };

  export type PasswordCredentialUpdateWithoutUserInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PasswordCredentialUncheckedUpdateWithoutUserInput = {
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    tokenHash?: StringFilter<'Session'> | string;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
  };

  export type BoardMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: BoardMemberWhereUniqueInput;
    update: XOR<BoardMemberUpdateWithoutUserInput, BoardMemberUncheckedUpdateWithoutUserInput>;
    create: XOR<BoardMemberCreateWithoutUserInput, BoardMemberUncheckedCreateWithoutUserInput>;
  };

  export type BoardMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: BoardMemberWhereUniqueInput;
    data: XOR<BoardMemberUpdateWithoutUserInput, BoardMemberUncheckedUpdateWithoutUserInput>;
  };

  export type BoardMemberUpdateManyWithWhereWithoutUserInput = {
    where: BoardMemberScalarWhereInput;
    data: XOR<BoardMemberUpdateManyMutationInput, BoardMemberUncheckedUpdateManyWithoutUserInput>;
  };

  export type BoardMemberScalarWhereInput = {
    AND?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
    OR?: BoardMemberScalarWhereInput[];
    NOT?: BoardMemberScalarWhereInput | BoardMemberScalarWhereInput[];
    id?: StringFilter<'BoardMember'> | string;
    boardId?: StringFilter<'BoardMember'> | string;
    userId?: StringFilter<'BoardMember'> | string;
    role?: EnumBoardMemberRoleFilter<'BoardMember'> | $Enums.BoardMemberRole;
    createdAt?: DateTimeFilter<'BoardMember'> | Date | string;
    updatedAt?: DateTimeFilter<'BoardMember'> | Date | string;
  };

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>;
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>;
  };

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput;
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>;
  };

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput;
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAuthorInput>;
  };

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[];
    OR?: CommentScalarWhereInput[];
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[];
    id?: StringFilter<'Comment'> | string;
    taskId?: StringFilter<'Comment'> | string;
    authorId?: StringNullableFilter<'Comment'> | string | null;
    text?: StringFilter<'Comment'> | string;
    createdAt?: DateTimeFilter<'Comment'> | Date | string;
    updatedAt?: DateTimeFilter<'Comment'> | Date | string;
  };

  export type TaskHistoryEventUpsertWithWhereUniqueWithoutActorInput = {
    where: TaskHistoryEventWhereUniqueInput;
    update: XOR<
      TaskHistoryEventUpdateWithoutActorInput,
      TaskHistoryEventUncheckedUpdateWithoutActorInput
    >;
    create: XOR<
      TaskHistoryEventCreateWithoutActorInput,
      TaskHistoryEventUncheckedCreateWithoutActorInput
    >;
  };

  export type TaskHistoryEventUpdateWithWhereUniqueWithoutActorInput = {
    where: TaskHistoryEventWhereUniqueInput;
    data: XOR<
      TaskHistoryEventUpdateWithoutActorInput,
      TaskHistoryEventUncheckedUpdateWithoutActorInput
    >;
  };

  export type TaskHistoryEventUpdateManyWithWhereWithoutActorInput = {
    where: TaskHistoryEventScalarWhereInput;
    data: XOR<
      TaskHistoryEventUpdateManyMutationInput,
      TaskHistoryEventUncheckedUpdateManyWithoutActorInput
    >;
  };

  export type TaskHistoryEventScalarWhereInput = {
    AND?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
    OR?: TaskHistoryEventScalarWhereInput[];
    NOT?: TaskHistoryEventScalarWhereInput | TaskHistoryEventScalarWhereInput[];
    id?: StringFilter<'TaskHistoryEvent'> | string;
    taskId?: StringFilter<'TaskHistoryEvent'> | string;
    actorId?: StringNullableFilter<'TaskHistoryEvent'> | string | null;
    type?: EnumTaskHistoryEventTypeFilter<'TaskHistoryEvent'> | $Enums.TaskHistoryEventType;
    payload?: JsonNullableFilter<'TaskHistoryEvent'>;
    createdAt?: DateTimeFilter<'TaskHistoryEvent'> | Date | string;
  };

  export type BoardMemberCreateWithoutBoardInput = {
    id?: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type BoardMemberUncheckedCreateWithoutBoardInput = {
    id?: string;
    userId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardMemberCreateOrConnectWithoutBoardInput = {
    where: BoardMemberWhereUniqueInput;
    create: XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>;
  };

  export type BoardMemberCreateManyBoardInputEnvelope = {
    data: BoardMemberCreateManyBoardInput | BoardMemberCreateManyBoardInput[];
    skipDuplicates?: boolean;
  };

  export type ColumnCreateWithoutBoardInput = {
    id?: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tasks?: TaskCreateNestedManyWithoutColumnInput;
  };

  export type ColumnUncheckedCreateWithoutBoardInput = {
    id?: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tasks?: TaskUncheckedCreateNestedManyWithoutColumnInput;
  };

  export type ColumnCreateOrConnectWithoutBoardInput = {
    where: ColumnWhereUniqueInput;
    create: XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>;
  };

  export type ColumnCreateManyBoardInputEnvelope = {
    data: ColumnCreateManyBoardInput | ColumnCreateManyBoardInput[];
    skipDuplicates?: boolean;
  };

  export type BoardMemberUpsertWithWhereUniqueWithoutBoardInput = {
    where: BoardMemberWhereUniqueInput;
    update: XOR<BoardMemberUpdateWithoutBoardInput, BoardMemberUncheckedUpdateWithoutBoardInput>;
    create: XOR<BoardMemberCreateWithoutBoardInput, BoardMemberUncheckedCreateWithoutBoardInput>;
  };

  export type BoardMemberUpdateWithWhereUniqueWithoutBoardInput = {
    where: BoardMemberWhereUniqueInput;
    data: XOR<BoardMemberUpdateWithoutBoardInput, BoardMemberUncheckedUpdateWithoutBoardInput>;
  };

  export type BoardMemberUpdateManyWithWhereWithoutBoardInput = {
    where: BoardMemberScalarWhereInput;
    data: XOR<BoardMemberUpdateManyMutationInput, BoardMemberUncheckedUpdateManyWithoutBoardInput>;
  };

  export type ColumnUpsertWithWhereUniqueWithoutBoardInput = {
    where: ColumnWhereUniqueInput;
    update: XOR<ColumnUpdateWithoutBoardInput, ColumnUncheckedUpdateWithoutBoardInput>;
    create: XOR<ColumnCreateWithoutBoardInput, ColumnUncheckedCreateWithoutBoardInput>;
  };

  export type ColumnUpdateWithWhereUniqueWithoutBoardInput = {
    where: ColumnWhereUniqueInput;
    data: XOR<ColumnUpdateWithoutBoardInput, ColumnUncheckedUpdateWithoutBoardInput>;
  };

  export type ColumnUpdateManyWithWhereWithoutBoardInput = {
    where: ColumnScalarWhereInput;
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyWithoutBoardInput>;
  };

  export type ColumnScalarWhereInput = {
    AND?: ColumnScalarWhereInput | ColumnScalarWhereInput[];
    OR?: ColumnScalarWhereInput[];
    NOT?: ColumnScalarWhereInput | ColumnScalarWhereInput[];
    id?: StringFilter<'Column'> | string;
    boardId?: StringFilter<'Column'> | string;
    title?: StringFilter<'Column'> | string;
    position?: IntFilter<'Column'> | number;
    isCompleted?: BoolFilter<'Column'> | boolean;
    isArchive?: BoolFilter<'Column'> | boolean;
    createdAt?: DateTimeFilter<'Column'> | Date | string;
    updatedAt?: DateTimeFilter<'Column'> | Date | string;
  };

  export type BoardCreateWithoutMembersInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    columns?: ColumnCreateNestedManyWithoutBoardInput;
  };

  export type BoardUncheckedCreateWithoutMembersInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    columns?: ColumnUncheckedCreateNestedManyWithoutBoardInput;
  };

  export type BoardCreateOrConnectWithoutMembersInput = {
    where: BoardWhereUniqueInput;
    create: XOR<BoardCreateWithoutMembersInput, BoardUncheckedCreateWithoutMembersInput>;
  };

  export type UserCreateWithoutMembershipsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialCreateNestedOneWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutActorInput;
  };

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialUncheckedCreateNestedOneWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput;
  };

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>;
  };

  export type BoardUpsertWithoutMembersInput = {
    update: XOR<BoardUpdateWithoutMembersInput, BoardUncheckedUpdateWithoutMembersInput>;
    create: XOR<BoardCreateWithoutMembersInput, BoardUncheckedCreateWithoutMembersInput>;
    where?: BoardWhereInput;
  };

  export type BoardUpdateToOneWithWhereWithoutMembersInput = {
    where?: BoardWhereInput;
    data: XOR<BoardUpdateWithoutMembersInput, BoardUncheckedUpdateWithoutMembersInput>;
  };

  export type BoardUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    columns?: ColumnUpdateManyWithoutBoardNestedInput;
  };

  export type BoardUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    columns?: ColumnUncheckedUpdateManyWithoutBoardNestedInput;
  };

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>;
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>;
  };

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUpdateOneWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    comments?: CommentUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutActorNestedInput;
  };

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput;
  };

  export type BoardCreateWithoutColumnsInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: BoardMemberCreateNestedManyWithoutBoardInput;
  };

  export type BoardUncheckedCreateWithoutColumnsInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: BoardMemberUncheckedCreateNestedManyWithoutBoardInput;
  };

  export type BoardCreateOrConnectWithoutColumnsInput = {
    where: BoardWhereUniqueInput;
    create: XOR<BoardCreateWithoutColumnsInput, BoardUncheckedCreateWithoutColumnsInput>;
  };

  export type TaskCreateWithoutColumnInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput;
    comments?: CommentCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutTaskInput;
  };

  export type TaskUncheckedCreateWithoutColumnInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput;
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutTaskInput;
  };

  export type TaskCreateOrConnectWithoutColumnInput = {
    where: TaskWhereUniqueInput;
    create: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>;
  };

  export type TaskCreateManyColumnInputEnvelope = {
    data: TaskCreateManyColumnInput | TaskCreateManyColumnInput[];
    skipDuplicates?: boolean;
  };

  export type BoardUpsertWithoutColumnsInput = {
    update: XOR<BoardUpdateWithoutColumnsInput, BoardUncheckedUpdateWithoutColumnsInput>;
    create: XOR<BoardCreateWithoutColumnsInput, BoardUncheckedCreateWithoutColumnsInput>;
    where?: BoardWhereInput;
  };

  export type BoardUpdateToOneWithWhereWithoutColumnsInput = {
    where?: BoardWhereInput;
    data: XOR<BoardUpdateWithoutColumnsInput, BoardUncheckedUpdateWithoutColumnsInput>;
  };

  export type BoardUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: BoardMemberUpdateManyWithoutBoardNestedInput;
  };

  export type BoardUncheckedUpdateWithoutColumnsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: BoardMemberUncheckedUpdateManyWithoutBoardNestedInput;
  };

  export type TaskUpsertWithWhereUniqueWithoutColumnInput = {
    where: TaskWhereUniqueInput;
    update: XOR<TaskUpdateWithoutColumnInput, TaskUncheckedUpdateWithoutColumnInput>;
    create: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>;
  };

  export type TaskUpdateWithWhereUniqueWithoutColumnInput = {
    where: TaskWhereUniqueInput;
    data: XOR<TaskUpdateWithoutColumnInput, TaskUncheckedUpdateWithoutColumnInput>;
  };

  export type TaskUpdateManyWithWhereWithoutColumnInput = {
    where: TaskScalarWhereInput;
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutColumnInput>;
  };

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[];
    OR?: TaskScalarWhereInput[];
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[];
    id?: StringFilter<'Task'> | string;
    columnId?: StringFilter<'Task'> | string;
    title?: StringFilter<'Task'> | string;
    description?: StringFilter<'Task'> | string;
    priority?: EnumTaskPriorityFilter<'Task'> | $Enums.TaskPriority;
    tags?: StringNullableListFilter<'Task'>;
    dueDate?: DateTimeNullableFilter<'Task'> | Date | string | null;
    archivedAt?: DateTimeNullableFilter<'Task'> | Date | string | null;
    position?: IntFilter<'Task'> | number;
    createdAt?: DateTimeFilter<'Task'> | Date | string;
    updatedAt?: DateTimeFilter<'Task'> | Date | string;
  };

  export type ColumnCreateWithoutTasksInput = {
    id?: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    board: BoardCreateNestedOneWithoutColumnsInput;
  };

  export type ColumnUncheckedCreateWithoutTasksInput = {
    id?: string;
    boardId: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ColumnCreateOrConnectWithoutTasksInput = {
    where: ColumnWhereUniqueInput;
    create: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>;
  };

  export type SubtaskCreateWithoutTaskInput = {
    id?: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubtaskUncheckedCreateWithoutTaskInput = {
    id?: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SubtaskCreateOrConnectWithoutTaskInput = {
    where: SubtaskWhereUniqueInput;
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>;
  };

  export type SubtaskCreateManyTaskInputEnvelope = {
    data: SubtaskCreateManyTaskInput | SubtaskCreateManyTaskInput[];
    skipDuplicates?: boolean;
  };

  export type CommentCreateWithoutTaskInput = {
    id?: string;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: UserCreateNestedOneWithoutCommentsInput;
  };

  export type CommentUncheckedCreateWithoutTaskInput = {
    id?: string;
    authorId?: string | null;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateOrConnectWithoutTaskInput = {
    where: CommentWhereUniqueInput;
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>;
  };

  export type CommentCreateManyTaskInputEnvelope = {
    data: CommentCreateManyTaskInput | CommentCreateManyTaskInput[];
    skipDuplicates?: boolean;
  };

  export type TaskHistoryEventCreateWithoutTaskInput = {
    id?: string;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    actor?: UserCreateNestedOneWithoutHistoryEventsInput;
  };

  export type TaskHistoryEventUncheckedCreateWithoutTaskInput = {
    id?: string;
    actorId?: string | null;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TaskHistoryEventCreateOrConnectWithoutTaskInput = {
    where: TaskHistoryEventWhereUniqueInput;
    create: XOR<
      TaskHistoryEventCreateWithoutTaskInput,
      TaskHistoryEventUncheckedCreateWithoutTaskInput
    >;
  };

  export type TaskHistoryEventCreateManyTaskInputEnvelope = {
    data: TaskHistoryEventCreateManyTaskInput | TaskHistoryEventCreateManyTaskInput[];
    skipDuplicates?: boolean;
  };

  export type ColumnUpsertWithoutTasksInput = {
    update: XOR<ColumnUpdateWithoutTasksInput, ColumnUncheckedUpdateWithoutTasksInput>;
    create: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>;
    where?: ColumnWhereInput;
  };

  export type ColumnUpdateToOneWithWhereWithoutTasksInput = {
    where?: ColumnWhereInput;
    data: XOR<ColumnUpdateWithoutTasksInput, ColumnUncheckedUpdateWithoutTasksInput>;
  };

  export type ColumnUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    board?: BoardUpdateOneRequiredWithoutColumnsNestedInput;
  };

  export type ColumnUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskUpsertWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput;
    update: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>;
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>;
  };

  export type SubtaskUpdateWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput;
    data: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>;
  };

  export type SubtaskUpdateManyWithWhereWithoutTaskInput = {
    where: SubtaskScalarWhereInput;
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutTaskInput>;
  };

  export type SubtaskScalarWhereInput = {
    AND?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[];
    OR?: SubtaskScalarWhereInput[];
    NOT?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[];
    id?: StringFilter<'Subtask'> | string;
    taskId?: StringFilter<'Subtask'> | string;
    title?: StringFilter<'Subtask'> | string;
    description?: StringFilter<'Subtask'> | string;
    isCompleted?: BoolFilter<'Subtask'> | boolean;
    position?: IntFilter<'Subtask'> | number;
    createdAt?: DateTimeFilter<'Subtask'> | Date | string;
    updatedAt?: DateTimeFilter<'Subtask'> | Date | string;
  };

  export type CommentUpsertWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput;
    update: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>;
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>;
  };

  export type CommentUpdateWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput;
    data: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>;
  };

  export type CommentUpdateManyWithWhereWithoutTaskInput = {
    where: CommentScalarWhereInput;
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutTaskInput>;
  };

  export type TaskHistoryEventUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskHistoryEventWhereUniqueInput;
    update: XOR<
      TaskHistoryEventUpdateWithoutTaskInput,
      TaskHistoryEventUncheckedUpdateWithoutTaskInput
    >;
    create: XOR<
      TaskHistoryEventCreateWithoutTaskInput,
      TaskHistoryEventUncheckedCreateWithoutTaskInput
    >;
  };

  export type TaskHistoryEventUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskHistoryEventWhereUniqueInput;
    data: XOR<
      TaskHistoryEventUpdateWithoutTaskInput,
      TaskHistoryEventUncheckedUpdateWithoutTaskInput
    >;
  };

  export type TaskHistoryEventUpdateManyWithWhereWithoutTaskInput = {
    where: TaskHistoryEventScalarWhereInput;
    data: XOR<
      TaskHistoryEventUpdateManyMutationInput,
      TaskHistoryEventUncheckedUpdateManyWithoutTaskInput
    >;
  };

  export type TaskCreateWithoutSubtasksInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    column: ColumnCreateNestedOneWithoutTasksInput;
    comments?: CommentCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutTaskInput;
  };

  export type TaskUncheckedCreateWithoutSubtasksInput = {
    id?: string;
    columnId: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutTaskInput;
  };

  export type TaskCreateOrConnectWithoutSubtasksInput = {
    where: TaskWhereUniqueInput;
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>;
  };

  export type TaskUpsertWithoutSubtasksInput = {
    update: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>;
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>;
    where?: TaskWhereInput;
  };

  export type TaskUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: TaskWhereInput;
    data: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>;
  };

  export type TaskUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    column?: ColumnUpdateOneRequiredWithoutTasksNestedInput;
    comments?: CommentUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    columnId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutTaskNestedInput;
  };

  export type TaskCreateWithoutCommentsInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    column: ColumnCreateNestedOneWithoutTasksInput;
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutTaskInput;
  };

  export type TaskUncheckedCreateWithoutCommentsInput = {
    id?: string;
    columnId: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutTaskInput;
  };

  export type TaskCreateOrConnectWithoutCommentsInput = {
    where: TaskWhereUniqueInput;
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>;
  };

  export type UserCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialCreateNestedOneWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberCreateNestedManyWithoutUserInput;
    historyEvents?: TaskHistoryEventCreateNestedManyWithoutActorInput;
  };

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialUncheckedCreateNestedOneWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberUncheckedCreateNestedManyWithoutUserInput;
    historyEvents?: TaskHistoryEventUncheckedCreateNestedManyWithoutActorInput;
  };

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
  };

  export type TaskUpsertWithoutCommentsInput = {
    update: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>;
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>;
    where?: TaskWhereInput;
  };

  export type TaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TaskWhereInput;
    data: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>;
  };

  export type TaskUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    column?: ColumnUpdateOneRequiredWithoutTasksNestedInput;
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    columnId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutTaskNestedInput;
  };

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>;
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>;
  };

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUpdateOneWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUpdateManyWithoutUserNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutActorNestedInput;
  };

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUncheckedUpdateManyWithoutUserNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutActorNestedInput;
  };

  export type TaskCreateWithoutHistoryEventsInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    column: ColumnCreateNestedOneWithoutTasksInput;
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput;
    comments?: CommentCreateNestedManyWithoutTaskInput;
  };

  export type TaskUncheckedCreateWithoutHistoryEventsInput = {
    id?: string;
    columnId: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput;
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput;
  };

  export type TaskCreateOrConnectWithoutHistoryEventsInput = {
    where: TaskWhereUniqueInput;
    create: XOR<TaskCreateWithoutHistoryEventsInput, TaskUncheckedCreateWithoutHistoryEventsInput>;
  };

  export type UserCreateWithoutHistoryEventsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialCreateNestedOneWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberCreateNestedManyWithoutUserInput;
    comments?: CommentCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateWithoutHistoryEventsInput = {
    id?: string;
    email: string;
    name?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    passwordCredential?: PasswordCredentialUncheckedCreateNestedOneWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    memberships?: BoardMemberUncheckedCreateNestedManyWithoutUserInput;
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutHistoryEventsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutHistoryEventsInput, UserUncheckedCreateWithoutHistoryEventsInput>;
  };

  export type TaskUpsertWithoutHistoryEventsInput = {
    update: XOR<TaskUpdateWithoutHistoryEventsInput, TaskUncheckedUpdateWithoutHistoryEventsInput>;
    create: XOR<TaskCreateWithoutHistoryEventsInput, TaskUncheckedCreateWithoutHistoryEventsInput>;
    where?: TaskWhereInput;
  };

  export type TaskUpdateToOneWithWhereWithoutHistoryEventsInput = {
    where?: TaskWhereInput;
    data: XOR<TaskUpdateWithoutHistoryEventsInput, TaskUncheckedUpdateWithoutHistoryEventsInput>;
  };

  export type TaskUpdateWithoutHistoryEventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    column?: ColumnUpdateOneRequiredWithoutTasksNestedInput;
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput;
    comments?: CommentUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateWithoutHistoryEventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    columnId?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput;
  };

  export type UserUpsertWithoutHistoryEventsInput = {
    update: XOR<UserUpdateWithoutHistoryEventsInput, UserUncheckedUpdateWithoutHistoryEventsInput>;
    create: XOR<UserCreateWithoutHistoryEventsInput, UserUncheckedCreateWithoutHistoryEventsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutHistoryEventsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutHistoryEventsInput, UserUncheckedUpdateWithoutHistoryEventsInput>;
  };

  export type UserUpdateWithoutHistoryEventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUpdateOneWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUpdateManyWithoutUserNestedInput;
    comments?: CommentUpdateManyWithoutAuthorNestedInput;
  };

  export type UserUncheckedUpdateWithoutHistoryEventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    passwordCredential?: PasswordCredentialUncheckedUpdateOneWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    memberships?: BoardMemberUncheckedUpdateManyWithoutUserNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;
  };

  export type SessionCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type BoardMemberCreateManyUserInput = {
    id?: string;
    boardId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateManyAuthorInput = {
    id?: string;
    taskId: string;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TaskHistoryEventCreateManyActorInput = {
    id?: string;
    taskId: string;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    tokenHash?: StringFieldUpdateOperationsInput | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    board?: BoardUpdateOneRequiredWithoutMembersNestedInput;
  };

  export type BoardMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    boardId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput;
  };

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    task?: TaskUpdateOneRequiredWithoutHistoryEventsNestedInput;
  };

  export type TaskHistoryEventUncheckedUpdateWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventUncheckedUpdateManyWithoutActorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    taskId?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberCreateManyBoardInput = {
    id?: string;
    userId: string;
    role?: $Enums.BoardMemberRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ColumnCreateManyBoardInput = {
    id?: string;
    title: string;
    position: number;
    isCompleted?: boolean;
    isArchive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type BoardMemberUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type BoardMemberUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type BoardMemberUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    role?: EnumBoardMemberRoleFieldUpdateOperationsInput | $Enums.BoardMemberRole;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ColumnUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: TaskUpdateManyWithoutColumnNestedInput;
  };

  export type ColumnUncheckedUpdateWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tasks?: TaskUncheckedUpdateManyWithoutColumnNestedInput;
  };

  export type ColumnUncheckedUpdateManyWithoutBoardInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    position?: IntFieldUpdateOperationsInput | number;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    isArchive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskCreateManyColumnInput = {
    id?: string;
    title: string;
    description?: string;
    priority?: $Enums.TaskPriority;
    tags?: TaskCreatetagsInput | string[];
    dueDate?: Date | string | null;
    archivedAt?: Date | string | null;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TaskUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput;
    comments?: CommentUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput;
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput;
    historyEvents?: TaskHistoryEventUncheckedUpdateManyWithoutTaskNestedInput;
  };

  export type TaskUncheckedUpdateManyWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority;
    tags?: TaskUpdatetagsInput | string[];
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskCreateManyTaskInput = {
    id?: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    position: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CommentCreateManyTaskInput = {
    id?: string;
    authorId?: string | null;
    text: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TaskHistoryEventCreateManyTaskInput = {
    id?: string;
    actorId?: string | null;
    type: $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type SubtaskUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SubtaskUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    isCompleted?: BoolFieldUpdateOperationsInput | boolean;
    position?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneWithoutCommentsNestedInput;
  };

  export type CommentUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableStringFieldUpdateOperationsInput | string | null;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CommentUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    authorId?: NullableStringFieldUpdateOperationsInput | string | null;
    text?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: UserUpdateOneWithoutHistoryEventsNestedInput;
  };

  export type TaskHistoryEventUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actorId?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TaskHistoryEventUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string;
    actorId?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: EnumTaskHistoryEventTypeFieldUpdateOperationsInput | $Enums.TaskHistoryEventType;
    payload?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
