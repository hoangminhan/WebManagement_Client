const Warning = ({ alert }) => {
  return (
    <div className="alert alert-warning" role="alert">
      {alert || 'Lỗi!'}
    </div>
  )
}

export default Warning