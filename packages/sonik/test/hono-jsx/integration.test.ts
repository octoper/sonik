/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest'
import { createApp } from '../../src'

describe('Basic', () => {
  const ROUTES = import.meta.glob('./app/routes/**/[a-z[-][a-z[_-]*.(tsx|ts)', {
    eager: true,
  })

  const app = createApp({
    root: './app/routes',
    ROUTES: ROUTES as any,
  })

  it('Should have correct routes', () => {
    const routes = [
      {
        path: '/about/:name',
        method: 'GET',
        handler: expect.anything(),
      },
      {
        path: '/about/:name/address',
        method: 'GET',
        handler: expect.anything(),
      },
      { path: '/api', method: 'GET', handler: expect.anything() },
      { path: '/api', method: 'POST', handler: expect.anything() },
      { path: '/', method: 'GET', handler: expect.anything() },
      { path: '/page', method: 'GET', handler: expect.anything() },
      {
        path: '/throw_error',
        method: 'GET',
        handler: expect.anything(),
      },
    ]
    expect(app.routes).toEqual(routes)
  })

  it('Should return 200 response - /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('<h1>Hello</h1>')
  })

  it('Should return 404 response - /foo', async () => {
    const res = await app.request('/foo')
    expect(res.status).toBe(404)
  })

  it('Should return 200 response /about/me', async () => {
    const res = await app.request('/about/me')
    expect(res.status).toBe(200)
    // hono/jsx escape a single quote to &#39;
    expect(await res.text()).toBe('<p>It&#39;s me</p><b>My name is me</b>')
  })

  it('Should return 200 response /page', async () => {
    const res = await app.request('/page')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('<h1>Function Component!</h1>')
  })

  it('Should return 500 response /throw_error', async () => {
    global.console.trace = vi.fn()
    const res = await app.request('/throw_error')
    expect(res.status).toBe(500)
    expect(await res.text()).toBe('Internal Server Error')
  })
})

describe('With preserved', () => {
  const ROUTES = import.meta.glob('./app/routes/**/[a-z[-][a-z-_[]*.(tsx|ts)', {
    eager: true,
  })

  const PRESERVED = import.meta.glob('./app/routes/(_error|_404).tsx', {
    eager: true,
  })

  const LAYOUTS = import.meta.glob('./app/routes/**/_layout.tsx', {
    eager: true,
  })

  const NESTED_LAYOUTS = import.meta.glob('./app/routes/**/__layout.tsx', {
    eager: true,
  })

  const app = createApp({
    root: './app/routes',
    ROUTES: ROUTES as any,
    PRESERVED: PRESERVED as any,
    LAYOUTS: LAYOUTS as any,
    NESTED_LAYOUTS: NESTED_LAYOUTS as any,
  })

  it('Should return 200 response - /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '<!doctype html><html><head><title>This is a title</title><meta name="description" content="This is a description"/></head><body><h1>Hello</h1></body></html>'
    )
  })

  it('Should return 404 response - /foo', async () => {
    const res = await app.request('/foo')
    expect(res.status).toBe(404)
    expect(await res.text()).toBe(
      '<!doctype html><html><head></head><body><h1>Not Found</h1></body></html>'
    )
  })

  it('Should return 200 response /about/me', async () => {
    const res = await app.request('/about/me')
    expect(res.status).toBe(200)
    // hono/jsx escape a single quote to &#39;
    expect(await res.text()).toBe(
      '<!doctype html><html><head><head><title>me</title></head></head><body><h1>About</h1><p>It&#39;s me</p><b>My name is me</b></body></html>'
    )
  })

  it('Should return 200 response /about/me/address', async () => {
    const res = await app.request('/about/me/address')
    expect(res.status).toBe(200)
    // hono/jsx escape a single quote to &#39;
    expect(await res.text()).toBe(
      '<!doctype html><html><head><head><title>me&#39;s address</title></head></head><body><h1>About</h1><address><b>me&#39;s address</b></address></body></html>'
    )
  })

  it('Should return 500 response /throw_error', async () => {
    const res = await app.request('/throw_error')
    expect(res.status).toBe(500)
    expect(await res.text()).toBe(
      '<!doctype html><html><head></head><body><h1>Custom Error Message: Foo</h1></body></html>'
    )
  })
})

describe('API', () => {
  const ROUES = import.meta.glob('./app/routes//**/[a-z[-][a-z-_[]*.(tsx|ts)', {
    eager: true,
  })

  const app = createApp({
    root: './app/routes',
    ROUTES: ROUES as any,
  })

  it('Should return 200 response - /api', async () => {
    const res = await app.request('/api')
    expect(res.status).toBe(200)
    expect(res.headers.get('X-Custom')).toBe('Hello')
    expect(await res.json()).toEqual({ foo: 'bar' })
  })

  it('Should return 200 response - POST /api', async () => {
    const res = await app.request('/api', {
      method: 'POST',
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({
      ok: true,
      message: 'created',
    })
  })
})

describe('MDX', () => {
  const ROUES = import.meta.glob('./app/routes/**/[a-z[-][a-z-_[]*.(tsx|mdx)', {
    eager: true,
  })

  const LAYOUTS = import.meta.glob('./app/routes/_layout.tsx', {
    eager: true,
  })

  const app = createApp({
    root: './app/routes',
    ROUTES: ROUES as any,
    LAYOUTS: LAYOUTS as any,
  })

  it('Should return 200 response with MDX', async () => {
    const res = await app.request('/post')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '<!doctype html><html><head></head><body><h2>Hello MDX!</h2></body></html>'
    )
  })
})
