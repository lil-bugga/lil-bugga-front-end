export default function Dashboard(){
  return(
    <div className="d-flex flex-wrap">
      <div className="quart_chunk">
        <p>Data Required</p>
        <ul>
            <li>current user data - all</li>
            <li>associated projects for user</li>
            <li>associated tickets for the user</li>
            <li>potentially notifications or updates</li>
        </ul>
      </div>
      <div className="quart_chunk"></div>
      <div className="quart_chunk"></div>
      <div className="quart_chunk"></div>
    </div>
  )
}