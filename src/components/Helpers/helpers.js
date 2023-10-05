export const findUserByEmail=(users,value)=>{
        let userData= users.filter((user)=>{
           return user.email==value;
         });
         return userData;
}

export const findBlogByEmail=(blogs,email)=>{
    return blogs.filter((blog)=>{
        return blog.email == email;
    });
}

export const decodeHtmlEntities=(encodedString)=>{
    const parser = new DOMParser();
    const dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html');
    return dom.body.textContent;
}

export const  capitalizeFirstLetter=(str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const findBlogById=(blogs,id)=>{
    return blogs.filter((blog)=>{
        return blog.id == id;
    });
}
export const UpdateUserField = (users,email,field,value,callback)=>{
    const updatedUsers = users.map(user => {
        if (user.email === email) {
            user[field] = value;
            if(callback){
                callback(user);
            }
          return user
        } else {
          return user;
        }
      });
      return updatedUsers;
}
export const defaultData = {
    id:1,
    title:"This is Default Blog Format, Below are detail to follow to create blog",
    content:"<p>This module contains the following articles, which will take you through all the basic theory of HTML and provide ample opportunity for you to test out some skills.</p><p><br></p><p>Getting started with HTML</p><p>Covers the absolute basics of HTML, to get you started — we define elements, attributes, and other important terms, and show where they fit in the language. We also show how a typical HTML page is structured and how an HTML element is structured, and explain other important basic language features. Along the way, we'll play with some HTML to get you interested!</p><p><br></p><p>What's in the head? Metadata in HTML</p><p>The head of an HTML document is the part that is not displayed in the web browser when the page is loaded. It contains information such as the page &lt;title&gt;, links to CSS (if you want to style your HTML content with CSS), links to custom favicons, and metadata (data about the HTML, such as who wrote it, and important keywords that describe the document).</p><p><br></p><p>HTML text fundamentals</p><p>One of HTML's main jobs is to give text meaning (also known as semantics), so that the browser knows how to display it correctly. This article looks at how to use HTML to break up a block of text into a structure of headings and paragraphs, add emphasis/importance to words, create lists, and more.</p><p><br></p><p>Creating hyperlinks</p><p>Hyperlinks are really important — they are what makes the web a web. This article shows the syntax required to make a link and discusses best practices for links.</p><p><br></p><p>Advanced text formatting</p><p>There are many other elements in HTML for formatting text that we didn't get to in the HTML text fundamentals article. The elements here are less well-known, but still useful to know about. In this article, you'll learn about marking up quotations, description lists, computer code and other related text, subscript and superscript, contact information, and more.</p><p><br></p><p>Document and website structure</p><p>As well as defining individual parts of your page (such as \"a paragraph\" or \"an image\"), HTML is also used to define areas of your website (such as \"the header\", \"the navigation menu\", or \"the main content column\"). This article looks into how to plan a basic website structure and how to write the HTML to represent this structure.</p><p><br></p><p>Debugging HTML</p><p>Writing HTML is fine, but what if something goes wrong, and you can't work out where the error in the code is? This article will introduce you to some tools that can help.</p>",
    comment:[
        {
            id:"1",
            comment:"This is for demo",
            reply:["hello"]
        }
    ],
    like:2,
    email:"test@test.com"
};