import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
const { mount } = require("enzyme");


describe('Test in <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    
    test('should show redirect component if there is no arguments in url', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ historyMock }/>
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
        
    });

    test('should render a hero if parameter exists', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-thor'] }>
                <Route path="/hero/:heroeId" component={ HeroScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe( true );
        
    });

    test('should return to previous page with PUSH', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-thor'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();
        
    });

    test('should return tu previuos page with GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-thor'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledTimes(0);
        expect( historyMock.goBack ).toHaveBeenCalled();
        
    });

    test('should call redirect if hero does not exists', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-dgeted'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');

    });
    
});
