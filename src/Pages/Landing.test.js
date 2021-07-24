import React from 'react'
import Landing from './Landing'
import UserContext from '../Components/UserProvider'

import { render, cleanup } from "@testing-library/react"

// beforeEach(cleanup)

test("renders the lil bugga title.", () => {
    const {queryByText} = render(<UserContext><Landing/></UserContext>)
    expect(queryByText("lil bugga")).toBeTruthy();
})

test("renders the sign-in form.", () => {
    const {getByRole} = render(<UserContext><Landing/></UserContext>)
    expect(getByRole("textbox").id).toBe("exampleInputEmail1");
})

test("renders the sample login.", () => {
    const {getByText} = render(<UserContext><Landing/></UserContext>)
    expect(getByText("Log in Sample User").type).toBe("button");
})