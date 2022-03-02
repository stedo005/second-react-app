import {render, waitFor, screen, fireEvent} from "@testing-library/react";
import Galerie from "./Galerie";
import {MemoryRouter} from "react-router-dom";

test('check response handling', async () => {

    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                info:{},
                results:[
                    {
                        name: 'Steve',
                        species: 'java developer in spe',
                        status: 'yet alive',
                        image: 'url'
                    },
                    {
                        name: 'André',
                        species: 'java developer',
                        status: 'alive',
                        image: 'url'
                    }
                ]
            })
        } as Response)
    })

    render(<Galerie/>, {wrapper: MemoryRouter});

    await waitFor(() => {
        expect(screen.getAllByTestId('galerie-item').length).toEqual(2)
    })

    const out = screen.getByTestId('search-field')

    fireEvent.change(out, { target: { value: 'Steve'}})

    await waitFor(() => {
        expect(screen.getAllByTestId('galerie-item').length).toEqual(1)
    })

});