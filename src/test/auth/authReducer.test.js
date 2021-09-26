import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Test in authReducer', () => {

    test('should return the default state', () => {
        
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({logged: false});

    });

    test('should authenticate and set the user name', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Dua'
            }
        }
        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({logged: true, name: 'Dua'});

    });

    test('should delete user name and set logged in false', () => {

        const action = {
            type: types.logout
        }
        const state = authReducer({ logged: true, name: 'Dua' }, action);
        expect( state ).toEqual({logged: false});

    });
    
    
})
