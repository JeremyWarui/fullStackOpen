import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      payload: {
        title: 'Tech Giants: Who Will Lead the Next Decade?',
        author: 'Chris Patel',
        url: 'https://mashable.com/tech-giants-next-decade',
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})
