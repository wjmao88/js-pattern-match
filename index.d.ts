import { TSTupleType } from "@babel/types";

declare module "js-Condition-match";

export type Condition<TVal> = (v: TVal) => boolean;

export type Mapper<TVal, TRes = TVal> = (v: TVal) => TRes;

export type InCaseApply<TVal, TRes = TVal> = Mapper<TVal, TRes | void>;

export type InCase<TVal> = 
  (condition: Condition<TVal>) => 
    <TRes>(onMatch: Mapper<TVal, TRes>) => 
      InCaseApply<TVal, TRes>

export type Match<TVal> = (v: TVal) => 
  <TRes>(...ia: InCaseApply<TVal, TRes>[]) => TRes | void;

export function match<TVal>(...args: Parameters<Match<TVal>>): ReturnType<Match<TVal>>

export function incase<TVal>(...args: Parameters<InCase<TVal>>): ReturnType<InCase<TVal>>

export function incaseVal<TVal>(
  val: TVal
): ReturnType<InCase<TVal>>;

export function incaseTuple<TVal extends any[]>(
  val: TVal
): ReturnType<InCase<TVal>>;