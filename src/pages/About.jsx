function About() {
  return (
    <div className="mt-3 text-center">
      <main role="main" className="container">
        <div className="jumbotron about-why-jumbo mx-auto">
          <h2>&quot;iPhone is disabled. Connect to iTunes&quot;</h2>
          <hr className="my-4" />
          <p className="lead">
            I built this tool to help save time. Many customers do not have
            computers to erase their phones, so I would do it for them, yet it
            was always an extra wait time of about 15 minutes to download the
            right IPSW.
          </p>
          <br />
          <p className="lead">
            Therefore, I wanted a tool to allow for bulk IPSW downloading of the
            latest firmwares.
          </p>
          <p className="lead">
            This tool is great for developers, repair shops, and schools!
          </p>
        </div>
      </main>

      <div className="mt-3 text-center pt-3">
        <main role="main" className="container">
          <div className="jumbotron about-why-jumbo mx-auto">
            <h2>Built with Flask, Python, and some boredom</h2>
            <hr className="my-4" />
            <h4 className="">
              {" "}
              Thanks to{" "}
              <a
                href="https://ipswdownloads.docs.apiary.io/#"
                target="_blank"
                rel="noopener noreferrer"
              >
                IPSW.ME
              </a>{" "}
              for the useful API
            </h4>
            <p className="lead">
              and to{" "}
              <a
                href="https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g"
                target="_blank"
                rel="noopener noreferrer"
              >
                Corey Schafer
              </a>{" "}
              and{" "}
              <a
                href="https://youtu.be/0ik6X4DJKCc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Traversy Media
              </a>{" "}
              for the great content
            </p>
          </div>
        </main>
      </div>

      <div className="mt-3 text-center">
        <main role="main" className="container">
          <div className="jumbotron about-why-jumbo mx-auto">
            <h2>Why the strange download names?</h2>
            <hr className="my-4" />
            <p className="lead">
              It has to do with Apple&apos;s naming scheme from their servers
            </p>
            <br />
            <p className="lead">
              To determine which file correlates to which device, use the build
              id found in the right column of iOS devices
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default About;
