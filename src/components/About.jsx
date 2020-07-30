import React from "react";
import "../stylesheets/About.scss";

// Introduction of the website including purpose and core features
class About extends React.Component {
  render() {
    return (
      <div className="content">
        <h1>About WishUpon</h1>
        <p>
          Wish Upon… is an online web application where users can enter their
          wish and share it with others. Due to COVID19 people may have a lot of
          wishes but are not able to fulfil them. It allows a user to submit a
          public wish where other users can see and fulfil. Its purpose is to
          provide a friendly atmosphere where users can meet over chat and have
          fun, it allows for people that want to give joy back to their
          community.
        </p>

        <p>
          Features include the ability for users to sign up and log in. A user
          is able to create, edit, or delete their own wishes. They can also
          view public wishes. They are not able to view private wishes. A logged
          on user can also comment or 'like' on public wishes.
        </p>

        <p>
          The user dashboard shows the current active wishes. They will be able
          to see their wishes, whether private or public. The main page will
          show the public wishes that people have made. We use flip cards to
          organize and show the public wishes. For public wishes, users can
          write comments and gives 'likes' to the wishes. This creates a
          community engagement that fosters good will.
        </p>
      </div>
    );
  }
}

export default About;
