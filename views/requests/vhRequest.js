module.exports = function (user, req, id) {
    // let opsMail =
    //     user['Base Country'] === 'Sierra Leone'
    //         ? 'vehicle-request@sl.easysolar.org'
    //         : 'operations@lib.easysolar.org'

    // let receipient = ''
    return {
        to: [user['Line Manager Email Address']],
        bcc: 'request-tracker@easysolar.org',
        from: 'techadmin@easysolar.org', // Use the email address or domain you verified above
        subject: `Vehicle Rcequest from ${user['Full Name']}`,
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ES Vehicle Form</title>
  <style>
    header {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }

    header section {
      display: flex;
      flex-direction: row;
      font-size: 14px;
    }

    header h4 {
      margin: 20px;
    }

    header h3 {
      margin: 10px;
    }

    button {
      width: 150px;
      height: 40px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 10px;
    }

    button a {
      color: white;
      font-size: 16px;
      text-decoration: none;
    }

    #approve {
      background-color: blue;
    }

    #reject {
      background-color: red;
    }
  </style>
</head>

<body>
  <header>
    <h1>Vehicle Requst</h1>

    <h3>Requester: ${user['Full Name']}</h3>
    <h4>Position: ${user['Job Title']}</h4>
  </header>

  <section>
    <h3>Requesting for: ${req.thirdpartyname}</h3>
    <h3>Destination: ${req.destination}</h3>
    <h3>Departure Date: ${req.departuredate}</h3>
    <h3>Return Date: ${req.returndate}</h3>
    <h3>Vehicle Reqested: ${req.vehicle}</h3>
  </section>

  <h3>Route Distribution Plan <a href=${req.invoices}>HERE</a></h3>
  <button id="approve"><a href="https://esformsbackend.herokuapp.com/approve/vehicle?id=${id}">Approve</a></button>
  <button id="reject"><a href="https://esformsbackend.herokuapp.com/reject/vehicle?id=${id}">Reject</a></button>
  </td>
  </tfoot>
  </table>
</body>

</html>
       `,
    }
}
