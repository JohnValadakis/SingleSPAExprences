import 'jsdom-global/register';
import React from 'react';
import { render, queryByAttribute, fireEvent } from '@testing-library/react';
import Forms from './Forms';

const getById = queryByAttribute.bind(null, 'id');

describe('Forms page tests', () => {
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    let sample = {
        type: "expense",
        amount: "80.34",
        date: "2020-12-24T09:11:12+0300",
        description: "Supermarket"
    };

    it('Renders without crashing', () => {
        let wrapper = render(<Forms />)
        expect(wrapper).not.toBeNull();
    });

    it('Sucessfully renders model', () => {

        let { container } = render(<Forms model={sample} />);
        let inputDescr = getById(container, 'description-input');

        const clearButton = getById(container, 'clearFormButton');
        const submitButton = getById(container, 'submitFormButton');
        act(() => {
            clearButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        })
        fireEvent.click(clearButton);
    });

});