import { useNavigate } from 'react-router-dom'

import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles.jsx'


const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate()

  const goToCategoryHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={goToCategoryHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem