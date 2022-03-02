import {render, screen} from '@testing-library/react';
import GalerieItem from "./GalerieItem";
import {MemoryRouter} from "react-router-dom";


test('check for correct rendering the component', () => {

    const name = 'Steve';
    const species = 'Human';
    const status = 'alive';
    const image = 'http://testurl/';

    render(<GalerieItem name={name} species={species} status={status} image={image}/>, {wrapper: MemoryRouter});

    expect(screen.getByTestId('name').textContent).toEqual('Steve');
    expect(screen.getByTestId('species').textContent).toEqual('Human');
    expect(screen.getByTestId('status').textContent).toEqual('alive');
    const imageTag = screen.getByTestId('image') as HTMLImageElement;
    expect(imageTag.src).toEqual('http://testurl/');
});