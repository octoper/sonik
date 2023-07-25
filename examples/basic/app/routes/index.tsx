import type { Route } from 'sonik'
import Counter from '../islands/Counter'

export default {
  GET: (_c, head) => {
    head.set({
      title: 'Welcome to Sonik!',
      meta: [{ name: 'description', content: 'This an example for Sonik' }],
    })
    return (
      <div>
        <h2>
          Hello <a href='/about/me'>me</a>!
        </h2>
        <Counter />
      </div>
    )
  },
} satisfies Route
