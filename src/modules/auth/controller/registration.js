//import { compare } from "bcryptjs";
import userModel from "../../../../DB/model/User.model.js"
import {generateToken} from "../../../utils/GenerateAndVerifyToken.js"
import sendEmail from "../../../utils/email.js"
//import {hash} from "../../../utils/HashAndCompare.js"
import {asyncHandler} from "../../../utils/errorHandling.js"
import { nanoid, customAlphabet } from "nanoid";

//**************************signup***************************/


export const signup = asyncHandler(async (req,res,next) => {

  const {userName,email, password,  address ,phone} = req.body;
  
const checkUser= await userModel.findOne ({email}) 

if(checkUser){
  return next (new Error ("Email exist " , {cause:409}))
}

//Send Email
const token = generateToken({payload : {email}, signature:process.env.EMAIL_TOKEN ,expiresIn:60 * 5 })
const refreshToken = generateToken({payload : {email},signature:process.env.EMAIL_TOKEN , expiresIn:60 * 60 * 24 })

const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
const reflink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${refreshToken}`


// const html = `<!DOCTYPE html>
// <head></head>
// <body>
// <a href = ${link}>confirm email</a> <br>
// <a href = ${reflink}> resend confirm email</a>
// </body>
// </html>`

const html = `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
<style type="text/css">
body{background-color: #88BDBF;margin: 0px;}
</style>
<body style="margin:0px;"> 
<table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
<tr>
<td>
<table border="0" width="100%">
<tr>
<td>
<h1>
     <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
</h1>
</td>
<td>
<p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
<tr>
<td style="background-color:#006666;height:100px;font-size:50px;color:#fff;">
<img width="50px" height="50px" src="${process.env.logo}">
</td>
</tr>
<tr>
<td>
<h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
</td>
</tr>
<tr>
<td>
<p style="padding:0px 100px;">
</p>
</td>
</tr>
<tr>
<td>
<a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#006666; ">Verify Email address</a>
</td>
</tr>
<tr>
<td>
<br>
<br>
<br>
<br>
<br>
<br>
<br> 

<br>
<a href="${reflink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#006666; "> Request new Confirm Email</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" width="100%" style="border-radius: 5px;text-align: center;">
<tr>
<td>
<h3 style="margin-top:10px; color:#000">Stay in touch</h3>
</td>
</tr>
<tr>
<td>
<div style="margin-top:20px;">

<a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>

<a href="${process.env.instagram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
</a>

<a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
</a>

</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`

if (!await sendEmail({to:email , subject:"Confirmation-Email" , html})) {
  return next (new Error ("Email rejected " , {cause:400}))
}

if(!checkUser){
  const {_id} = await userModel.create({userName, email,password ,address,phone})
return res.json({msg:"Done"} , _id )

}

})

// export const confirmEmail = asyncHandler(async (req,res,next) => {

//   const {token} = req.params;
//   const {email} = verifyToken({token,signature: process.env.EMAIL_TOKEN})

//   if (!email) {
//     return next (new Error ("in-valid token payload " , {cause:400}))

//   }

//   const user = await userModel.updateOne({ email},{ confirmEmail: true})


//    if (user.matchedCount) {
//     return res.status(200).redirect(`${process.env.FE_URL}/#/login`)
//   } else{
//     //return res.status(200).redirect(`${process.env.FE_URL}/#/NotRegisterAccount`)
//     //return res.status(200).render(`confirmEmail`, {message:"not register account"})
//     return res.status(200).json({message:"not register account"})

//    }

// })


// ////////////////////*NEW
// export const requestNewConfirmEmail = asyncHandler(async (req,res,next) => {

//   const {token} = req.params;
//   const {email} = verifyToken({token,signature: process.env.EMAIL_TOKEN})

//   if (!email) {
//     return next (new Error ("not register account " , {cause:400}))

//   }

//   const user = await userModel.findOne({ email})

// if (!user) {
//   return next (new Error ("not found" , {cause:404}))
// }

// if (user,confirmEmail) {
//       return res.status(200).redirect(`${process.env.FE_URL}/#/login`)
// }

// const newToken = generateToken({payload : {email} , signature:process.env.EMAIL_TOKEN ,expiresIn: 60 * 2})

// // const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
// const link = `http://localhost:5000/auth/confirmEmail/${newToken}`
// const reflink = `http://localhost:5000/auth/NewConfirmEmail/${tokwen}`

// const html = `<!DOCTYPE html>
// <html>
// <head>
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
// <style type="text/css">
// body{background-color: #88BDBF;margin: 0px;}
// </style>
// <body style="margin:0px;"> 
// <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
// <tr>
// <td>
// <table border="0" width="100%">
// <tr>
// <td>
// <h1>
//     <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
// </h1>
// </td>
// <td>
// <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
// </td>
// </tr>
// </table>
// </td>
// </tr>
// <tr>
// <td>
// <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
// <tr>
// <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
// <img width="50px" height="50px" src="${process.env.logo}">
// </td>
// </tr>
// <tr>
// <td>
// <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
// </td>
// </tr>
// <tr>
// <td>
// <p style="padding:0px 100px;">
// </p>
// </td>
// </tr>
// <tr>
// <td>
// <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
// </td>
// </tr>
// <tr>
// <td>
// <br>
// <br>
// <br>
// <br>
// <br>
// <br>
// <br>
// <br>
// <a href="${reflink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Request new Confirm Email</a>
// </td>
// </tr>
// </table>
// </td>
// </tr>
// <tr>
// <td>
// <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
// <tr>
// <td>
// <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
// </td>
// </tr>
// <tr>
// <td>
// <div style="margin-top:20px;">

// <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
// <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>

// <a href="${process.env.instagram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
// <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
// </a>

// <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
// <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
// </a>

// </div>
// </td>
// </tr>
// </table>
// </td>
// </tr>
// </table>
// </body>
// </html>`

// if (! await sendEmail({to : email , subjects: "Confirmation-Email", html})) {
//   return next (new Error ("Email rejected " , {cause:400}))

// }

// return res.status(200).send("<p> new confirmation email sent to your index please check it ASAP </p>") 
// })


///////////*Signin*///////

// export const login = asyncHandler( async (req, res, next) => {
//   try {
//       const { email, password } = req.body;
//           const admin = await adminModel.findOne({ email });
//       if (!admin) {
//           return res.status(401).json({ message: "Invalid email or password" });
//       }
//       if (admin.password !== password) {
//           return res.status(401).json({ message: "Invalid email or password" });
//       }
//       const token = jwt.sign(
//           { email: admin.email, id: admin._id },
//           'hazem', 
//           { expiresIn: '24h' } 
//       );
//       res.status(200).json({ token });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// })

/////////////*login* ////////////


export const login = asyncHandler(async (req,res,next) => {

  const {email, password} = req.body;
  
const user= await userModel.findOne ({email}) 

if(!user){
  return next (new Error ("not register account " , {cause:404}))
  //           return res.status(404).json({ message: "Invalid email or password" });

}
if (user.password !== password ) {
  // if (!compare({plaintext: password , hashValue:user.password})) {
  
     return res.status(401).json({ message: "Invalid email or password" });

}

const access_token = generateToken({
            payload : { email: user.email, id: user._id },
             
            expiresIn: 60 * 60 * 24,
 });

 const refreshToken_token = generateToken({
  payload : { email: user.email, id: user._id },
   
  expiresIn: 60 * 60 *24 * 365 ,
});
      
// const userData = {

// }
// const {_id} = await userModel.create({userName, email,password ,address,phone})


const userData = await userModel.findOne({})
  // .populate([
  //   {
  //     path:'subcategory'
  //   } 
  // ])
  

user.status = 'online'
await user.save ()
return res.json({msg:"Done" , access_token , refreshToken_token , user} )



})


////////sendCode /////

export const sendCode = asyncHandler(
  async(req,res,next) => {

    const {email} = req.body ;
    const nanoId = customAlphabet('123456789' ,4)
    // const code =  Math.floor(Math.random() * (9999 - 1000 +1) + 1000)
    const code = nanoId()  
    //const user = await userModel.findOneAndUpdate({email}, {forgetCode:code} , {new : true})
    const user = await userModel.findOneAndUpdate({email}, {forgetCode:code} )

    if (!user) {
      return next (new Error ('not register account ', {cause :404}))
    }

    const html =  `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="${process.env.logo}">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Reset Password</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <p style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border
    : 0;color:#fff;background-color:#630E2B; ">${code}</p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>

    <a href="${process.env.instagram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>

    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
      </html>`

if (!await sendEmail({to:email , subject:"Reset Password" , html})) {
   return next (new Error ("Email rejected " , {cause:400}))
 }
    return res.status(200).json({Message : "Done" }) 
    
})


export const forgetPassword = asyncHandler(
  async(req,res,next) => {

    const {email , forgetCode , password} = req.body ;

    const user = await userModel.findOne({email})

    if (!user) {
      return next (new Error ('not register account ', {cause :404}))
    }
    if (user.forgetCode != forgetCode || !forgetCode) {
      return next (new Error ('in-valid reset Code', {cause :400}))
    }

    //user.password = hash ({plaintext : password})
    user.password = password ; 
    user.forgetCode = null ;
    user.changePasswordTime = Date.now();
    await user.save()

    return res.status(200).json({Message : "done"}) 
  }
)