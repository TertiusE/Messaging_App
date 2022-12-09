import React from 'react'
import { Text } from 'react-native'
const Settings = ({ user, accentColour, systemFont }) => {
  return (
    <Text>Settings</Text>
  )
}

const mapDispatch = { setUser, setAccentColour, setFont };
const mapState = (store) => ({
  user: store.dataReducer.user,
  accentColour: store.dataReducer.accentColour,
  systemFont: store.dataReducer.systemFont
});

export default connect(mapState, mapDispatch)(Settings);