export default function Project() {
    return (
        // Page with Side Bar
        <div className="page d-flex with_side_panel p-0 m-0" id="">

            {/* Side Bar */}
            <div className="container-fluid side_panel m-0">
                Links and stuff
            </div>

            {/* Page adjacent to Side Bar */}
            <div className="container-fluid d-flex page m-0 p-0">
                
                <div className="container-fluid quart_chunk">
                <p>Data Required</p>
                <ul>
                    <li>current user name</li>
                    <li>project information and all tickets</li>
                </ul>
                </div>
                <div className="quart_chunk">hello</div>
                <div className="quart_chunk"></div>
                <div className="quart_chunk"></div>

            </div>
        </div>
    )
}