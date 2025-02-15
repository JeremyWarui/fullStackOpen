const { test, expect } = require('@playwright/test')
const { debug } = require('console')

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.locator('form')).toBeVisible()
  })

  test('user can Login correct credentials', async ({ page }) => {
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('blogs')).toBeVisible()
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    expect(page.getByText('blogs')).not.toBeVisible()
    expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByTestId('title').fill('New Blog Title')
      await page.getByTestId('author').fill('User Test')
      await page.getByTestId('url').fill('http://example.com')

      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'Cancel' }).click()

      await expect(page.getByText('New Blog Title User Test')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    test.describe('a blog exists', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()

        await page.getByTestId('title').fill('New Blog Title')
        await page.getByTestId('author').fill('User Test')
        await page.getByTestId('url').fill('http://example.com')

        await page.getByRole('button', { name: 'create' }).click()
        await page.getByRole('button', { name: 'Cancel' }).click()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })
      test('a blog can be deleted by user', async ({ page }) => {
        await page.on('dialog', async (dialog) => {
          if (dialog.message() === 'Remove by') {
            await dialog.accept()
          } else {
            await dialog.dismiss()
          }
        })

        await expect(page.getByText('New Blog Title User Test')).not.toBeVisible()
      })

      test('user can see delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        const locator = await page.getByRole('button', { name: 'remove'})

        await expect(page.getByText('Matti Luukkainen', { exact: true })).toBeVisible()
        await expect(locator).toBeVisible()
      })

      test('blogs are ordered by likes with the most first', async ({ page }) => {
        //creates one more blog
        await page.getByRole('button', { name: 'create new blog' }).click()

        await page.getByTestId('title').fill('first new blog title')
        await page.getByTestId('author').fill('User Test2')
        await page.getByTestId('url').fill('http://example.com')

        await page.getByRole('button', { name: 'create' }).click()
        await page.waitForResponse(response => response.status() === 201)
        await page.getByRole('button', { name: 'Cancel' }).click()

        //creates second
        await page.getByRole('button', { name: 'create new blog' }).click()

        await page.getByTestId('title').fill('second new blog title')
        await page.getByTestId('author').fill('User Test2')
        await page.getByTestId('url').fill('http://example.com')

        await page.getByRole('button', { name: 'create' }).click()
        await page.waitForResponse(response => response.status() === 201)
        await page.getByRole('button', { name: 'Cancel' }).click()

        //like the second blog
        const secondBlog = await page.getByText('second new blog title User Test2').locator('..')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()
        await secondBlog.getByRole('button', { name: 'like' }).click()

        // verify order of blogs after likes
        const blogs2 = await page.locator('.blog').all()
          
        await expect(blogs2[0]).toContainText('second new blog title User Test2')
        
      })
    })
  })
})
