import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Router } from '../src/Router'
import { Link } from '../src/Link'
import { Route } from '../src/Route'
import { getCurrentPath } from '../src/utils'

vi.mock('../src/utils', () => ({
    getCurrentPath: vi.fn()
}))

describe('tests on Router', () => {

    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()
    })

    it('should render wihtout problems', () => {
        render(<Router routes={[]} />)
        screen.debug()
        expect(true).toBeTruthy()
    })

    it('should render page404 if no routes match', () => {
        render(<Router routes={[]} defaulComponent={() => <h1>404</h1>} />)
        screen.debug()
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/')
        const routes = [
            {
                path: '/about',
                Component: () => <h1>AboutComponent</h1>
            },
            {
                path: '/',
                Component: () => <h1>HomeComponent</h1>
            },
        ]
        render(<Router routes={routes} />)
        screen.debug()
        expect(screen.getByText('HomeComponent')).toBeTruthy()
    })

    it('should navigate using Links', async () => {
        getCurrentPath.mockReturnValue('/')
        render(<Router>
            <Route path='/' Component={() => {
                return (
                    <>
                        <h1>Home</h1>
                        <Link to='/about'>Go to About</Link>
                    </>
                )
            }} />
            <Route path='/about' Component={() => <h1>About</h1>} />
        </Router>
        )

        const goToAbout = screen.getByText(/Go to About/)
        goToAbout.click()
        const aboutTitle = await screen.findByText('About')
        screen.debug()
        expect(aboutTitle).toBeTruthy()
    })


})
