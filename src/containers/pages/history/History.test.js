import 'jsdom-global/register';
import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import History from './History';

describe('Hitory page tests', () => {
    it('should work', () => {
        let container = render(<History />);
        const loadDataButton = document.querySelector("[id=inputloadInitialDataId]");
        act(() => {
            loadDataButton.dispatchEvent( new MouseEvent("click", { bubbles: true }));
        })
    });
})

describe('Hitory Functionality', () => { })