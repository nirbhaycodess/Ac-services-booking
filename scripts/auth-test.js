(async ()=>{
  try{
    const resp = await fetch('http://localhost:4000/api/auth/tech-login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email: 'tech@ac.local', password: 'TechPass123' })
    })
    const text = await resp.text()
    console.log('STATUS', resp.status)
    console.log(text)
  }catch(e){console.error(e)}
})()
