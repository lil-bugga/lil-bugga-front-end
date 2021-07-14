export default function Table(props) {
    return (
        <table class="table table-light border">
            <thead>
                <tr>
                    {/* Maps the table header to top row. */}
                    {props.content[0].map(e => {
                        return <th scope="col">{e}</th>
                    })}
                </tr>
            </thead>
        <tbody>
            {/* Maps the content to table rows. */}
            {props.content.slice(1).map(row => {
                return (
                    <tr>
                    {row.map(e=>{
                    return <td>{e}</td>
                    })}
                    </tr>
                )
            })}
        </tbody>
    </table>
    )
}