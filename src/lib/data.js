const baseUrl = "https://kodessphere-api.vercel.app"


export const getApplianceStatus =  async () => {
  try {
    const response = await fetch(`https://kodessphere-api.vercel.app/devices/n16r1l1`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting status");
  }
}