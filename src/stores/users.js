import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUsersStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref('')
  const loading = ref(false)
  const loadingUser = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleLogin = async (credentials) => {
    const { email, password } = credentials

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Email is invalid')
    }

    if (!password.length) {
      return (errorMessage.value = 'Password cannot be empty')
    }

    loading.value = true

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      loading.value = false
      return (errorMessage.value = error.message)
    }
    const { data: existingUser } = await supabase.from('users').select().eq('email', email).single()

    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
      imageUrl: existingUser.imageUrl
    }

    loading.value = false
    errorMessage.value = ''
  }

  const handleSignup = async (credentials) => {
    const { password, username, email } = credentials

    if (password.length < 3) {
      return (errorMessage.value = 'Password must be at least 6 characters')
    }

    if (username.length < 2) {
      return (errorMessage.value = 'Username is too short')
    }

    loading.value = true

    // Validate if user exists
    const { data: userWithUsername } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single()
    console.log(userWithUsername)

    if (userWithUsername) {
      loading.value = false
      console.log('find user')
      handleLogin({ email: email, password: password })
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      loading.value = false
      return (errorMessage.value = error.message)
    }

    await supabase.from('users').insert({
      username,
      email
    })

    const { data: newUser } = await supabase.from('users').select().eq('email', email).single()
    console.log(newUser)
    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      imageUrl: newUser.imageUrl
    }

    loading.value = false
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getUser = async () => {
    loadingUser.value = true
    const { data } = await supabase.auth.getUser()
    console.log('getUser', data)
    if (!data.user) {
      loadingUser.value = false
      return (user.value = null)
    }
    const { data: userWithEmail } = await supabase
      .from('users')
      .select()
      .eq('email', data.user.email)
      .single()
    user.value = {
      username: userWithEmail.username,
      email: userWithEmail.email,
      id: userWithEmail.id,
      imageUrl: userWithEmail.imageUrl
    }
    loadingUser.value = false
  }
  const clearErrorMessage = () => {
    console.log('clear')
    errorMessage.value = ''
  }

  return {
    user,
    errorMessage,
    loading,
    loadingUser,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage
  }
})
