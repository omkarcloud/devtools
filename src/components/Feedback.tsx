import { useState } from 'react'
import {
  EuiHeaderLink,
} from '@elastic/eui'


function ShareYourThoughtsModal() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [feedback, setfeedback] = useState('')

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
    setfeedback('')
  }

  const content = "Love It? Star It! ★"

  
    // Maybe AB TEST
  // Suggest Features
  // Give Feedback
  // Share Your Thoughts

  return (
    <>

      <EuiHeaderLink 
      href={'https://github.com/omkarcloud/devtools'}
      // onClick={toggleModal}
       color="primary">{content}</EuiHeaderLink>
      
    </>
  )
}
const GiveFeedback = () => {
  return (
    <ShareYourThoughtsModal />
  )
}
export default GiveFeedback
