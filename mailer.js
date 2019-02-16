Email.send({
    Host : "smtp.yourisp.com",
    Username : "punamkakpure@gmail.com",
    Password : " 14f059b0-c276-43fc-bcd0-383b440b8e97",
    To : 'them@website.com',
    From : "punamkakpure@gmail.com",
    Subject : "This is the dummy Subject",
    Body : "We are From OFAJ"
}).then(
  message => alert(message)
);