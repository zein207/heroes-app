import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';


describe('Test <LoginScreen />', () => {

    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <LoginScreen history={ history } />
        </AuthContext.Provider>
    )
    
    test('should show correctly', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('should run dispatch and navigation', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Dua Lipa'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/marvel');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/marvel');

    })
    
    
})
