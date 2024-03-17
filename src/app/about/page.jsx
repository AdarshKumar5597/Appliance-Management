import Image from "next/image"

export const metadata = {
  title: "About Page",
  description: "About us",
}

const AboutPage = () => {
  return (
    <div className="lg:flex lg:flex-row lg:gap-x-[100px] md:flex md:flex-col sm:flex sm:flex-col font-mono text-black mx-12">
      <div className="flex-1 flex flex-col gap-y-8">
        <p className=" text-lg font-bold text-[#3673fd]">
          Take Control of Your Home with Effortless Appliance Management
        </p>
        <h1 className=" text-5xl font-bold">About AppHQ</h1>
        <p className="text-[20px] font-semibold">
          Appliance Management is your one-stop hub for a smarter, simpler
          connected home. This intuitive application puts you in command of your
          appliances, allowing you to:
        </p>
        <ul className="ml-8 list-disc text-[20px] ">
          <li>
            <p className="font-bold">Monitor Performance:</p>
            <p>
              Gain valuable insights into your appliances&apos; health and
              efficiency.
            </p>
          </li>
          <li>
            <p className="font-bold">Remote Control:</p>
            <p>
              Adjust settings, turn appliances on or off, and receive real-time
              notifications - all from your smartphone or tablet.
            </p>
          </li>
          <li>
            <p className="font-bold">Peace of Mind:</p>
            <p>
              Adjust settings, turn appliances on or off, and receive real-time
              notifications - all from your smartphone or tablet.
            </p>
          </li>
        </ul>
        <p>
          Appliance Management empowers you to manage your home with ease, save
          time and resources, and enjoy a more connected living experience.
        </p>
      </div>
      <div className="flex-1 relative">
        <Image
          src={"/hero.gif"}
          alt="about"
          fill
          className="w-96 h-96 object-contain"
        />
      </div>
    </div>
  )
}

export default AboutPage
