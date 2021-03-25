import React from "react";

export default function Foooter() {
  return (
    <footer>
      <p>
        Xjungle would appreciate any suggestion. Forward to the author{" "}
        <a href="https://ww.kelvinsekx/codes">kelvinsekx</a>
      </p>
      <div>
        <strong>About XJungle :</strong> This is an interesting game very
        similar to the tic tac toe game only with a twist. It is a popular paper
        game in Nigeria {"\u{1F600}"}.{" "}
      </div>
      <div className="ack">
        <p>
          <strong style={{ borderBottom: "2px solid black" }}>
            Acknowledgements (this part is subjected to change without notice){" "}
          </strong>
        </p>
        <div style={{ padding: 0, margin: 0 }}>
          <p style={{ padding: 0, margin: 0 }}>
            {" "}
            This is a simple game but would have not been possible without the
            help of some really awesome people. I'd like to appreaciate my mum
            for the support and resilience will building this app even when I
            know she doesnot read my blog or play my game. Also, my siblings:
            Joshua and Eric, I like to call them the two crazy people in my
            life. I would love to appreciate Tomi Osinuga for in some type of
            way urging me to quicken the release of this app.{" "}
          </p>
          <p className='stud'>
            As a teacher, I had some really awesome students of 'de-first safeway' whose gesture,
            disturbance and nuggets have made the experience building this app
            so amazing. They include and are not limited to the following:{" "}
            <strong>Arogundade</strong>, <strong>TEMILADE</strong>,{" "}
            <strong>Ifeoluwa</strong>, <strong>Ademoyegun Ayomide</strong>,{" "}
            <strong>Folakemi Alao</strong>, <strong>Ayodeji</strong>, and <strong>Hammed</strong> for tipping me on why I should quickly implement offline experience. You
            people rock.
          </p>
          <p>
            Awesome programming students like Rasheed, and feedbacks from him
            and Rotimi were also useful for the continual development of this
            app. Overall thanks to everyone who has helped with the experimental
            stage I wish this page is big enough for me to list you all but it
            just wouldn't, and my mentors, Irabor and Aaron -finally and surely
            to most especially God for the help.
          </p>
        </div>
      </div>
      <div>&copy; 2021 with Tears and Love</div>
    </footer>
  );
}
