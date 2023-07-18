import './Successful.css'

const Successful = ({message,error}) => {

  return (
    <div>
    {message && <div className="message g">{message}</div>}
    {error && <div className='message r'>{error}</div>}
    </div>
  )
}

export default Successful
