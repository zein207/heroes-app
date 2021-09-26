import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router';


describe('Test in <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();
    
    test('should show the component if user is authenticated and save in localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={ () => <span>Ready!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPathName', '/marvel' );
    });

    test('should block the component if user is not authenticated', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={ () => <span>Ready!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( false );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPathName', '/marvel' );

    })
    
    
})
