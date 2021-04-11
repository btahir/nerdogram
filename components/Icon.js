import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Icon({ icon, width, height }) {
  return (
    <FontAwesomeIcon className={`${width} ${height} inline-flex text-gray-900`} icon={icon} />
  )
}

export default Icon
