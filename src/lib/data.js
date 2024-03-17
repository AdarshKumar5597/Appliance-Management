export const getApplianceStatus = async () => {
  try {
    const response = await fetch(
      `https://kodessphere-api.vercel.app/devices/n16r1l1`
    )
    const data = await response.json()
    // console.log(data);
    if (data) {
      return data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
