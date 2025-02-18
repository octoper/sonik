/* eslint-disable @typescript-eslint/no-explicit-any */
export type { Head }
export type { Hono, Context } from 'hono'
import type { Context, Env, Hono, Next } from 'hono'
import type { Head } from './server/head.js'

/** Internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Node = any
export type HandlerResponse<N = Node> =
  | N
  | Promise<N>
  | Response
  | Promise<Response>
  | Promise<Response | N>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppHandler<E extends Env = Env, N = Node> = (
  app: Hono<E, any, any>,
  props: {
    head: Head<N>
    render: (node: N, status?: number) => Response | Promise<Response>
  }
) => void
export type ReservedHandler = Handler | ErrorHandler | LayoutHandler
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** JSX */
export type CreateElement = (type: any, props: any, ...children: any[]) => Node
export type FragmentType = any
export type RenderToString<N = Node> = (node: N) => string
export type RenderToReadableStream<N = Node> = (node: N, options?: any) => Promise<ReadableStream>
export type Hydrate = (children: Node, parent: Element) => void

/** external */
export type Handler<E extends Env = Env, N = Node> = (
  c: Context<E>,
  props: {
    head: Head<N>
    next: Next
  }
) => HandlerResponse<N>

/** Preserved */
export type NotFoundHandler<E extends Env = Env, N = Node> = (
  c: Context<E>,
  props: { head: Head<N> }
) => HandlerResponse<N>

export type ErrorHandler<E extends Env = Env, N = Node> = (
  c: Context<E>,
  props: { error: Error; head: Head<N> }
) => HandlerResponse<N>

export type LayoutHandler<N = Node> = (props: {
  children: N | string
  head: Head<N>
  filename: string
}) => N | string | Promise<N | string>

/** Function Component */
export type FC<E extends Env = Env, N = Node> = (c: Context<E>, props: { head: Head<N> }) => N

/** Route */
export type Route<E extends Env = Env, N = Node> = Partial<{ [Key in Methods]: Handler<E, N> }> &
  Partial<{
    APP: AppHandler<E, N>
  }>
