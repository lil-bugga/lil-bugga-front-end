import { Link } from "react-router-dom"

export default function Table(props) {
    return (
        <table className="table">
            <thead>
                <tr key="tr_0">
                    {/* Maps the table header to top row. */}
                    {props.content[0].map((e, idx) => {
                        return (
                        <th scope="col" key={`te_0_${idx}`}>{e}</th>
                        )
                    })}
                </tr>
            </thead>
        <tbody>
            {/* Maps the content to table rows. */}
            {props.content.slice(1).map((row, idx) => {
                return (
                    <tr key={`tr_${idx+1}`}>
                        {row.map((e, idy)=>{

                            if(idy+1 === row.length){
                                return <td key={`te_${idx}_${idy}`}><Link className="btn w-100 btn-primary" to={e}>View</Link></td>
                            }

                            return <td key={`te_${idx}_${idy}`}>{e}</td>
                        })}
                    </tr>
                )
            })}
        </tbody>
    </table>
    )
}