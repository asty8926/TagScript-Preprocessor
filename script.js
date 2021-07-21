const input = document.querySelector('#input')
const output = document.querySelector('#output')

const processBtn = document.querySelector(".process")

const checkbox = document.querySelector('#realtime')

const defaultOutput = "Your processed code will be rendered here."

const char = {
  balanced: "✓",
  unbalanced: "❌",
}

function focusInput() {
  setTimeout(() => {
    input.focus()
    //console.log("Focused!")
  }, 0)
  
}

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
  
  focusInput()
}

document.addEventListener('scroll', e => {
  const scrollThreshold = 200
  const arrowToTop = document.querySelector('#scroll-to-top')
  
  if (window.scrollY > scrollThreshold) {
    //console.log("Scrolled")
    // Makes the up arrow to scroll to top appear on scroll
    arrowToTop.classList.remove("hidden")
  } else if (window.scrollY < scrollThreshold) {
      arrowToTop.classList.add("hidden")
  }
})

const copyGreenDuration = mstos(0.5)

const copyButtons = document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    btn.classList.add("green")
    btn.textContent = "Copied!"
  
  // Removing the green background after 1 second
  setTimeout(() => {
    btn.classList.remove("green");
    btn.textContent = "Copy"
  }, copyGreenDuration)
    
  })
})

setTimeout(() => {
  document.querySelectorAll(".copiable").forEach(mdEl => {
  mdEl.addEventListener("click", (e) => {
    
    let mdTxt = e.target.innerText
    
    mdEl.classList.add("green")
    mdEl.textContent = "Copied!"
    
    // Removing the green background after 1 second
    setTimeout(() => {
      mdEl.classList.remove("green");
      mdEl.textContent = mdTxt
    }, copyGreenDuration)
    
    
    // Textarea + Select & copy trick
    
    //console.log(mdTxt)
    
    let tempInput = document.createElement("textarea")
    tempInput.value = mdTxt
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    //console.log("Example copied!")
    document.body.removeChild(tempInput)
    
  })
})
}, 0)

const outputCopyBtn = document.querySelector('#output-copy-btn')

outputCopyBtn.addEventListener("click", (e) => {
  copyOutput()
  
})

// Function that gets called when output COPY button clicked
function copyOutput() {
  // Workaround that creates a temporary input field
  // Sets its value to our output code
  // Then select its content and copy
  let outCode = output.innerText
  // last-minute change: switched from input to textarea, to preserve line breaks
  let tempInput = document.createElement("textarea")
  tempInput.value = outCode
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand("copy")
  document.body.removeChild(tempInput)
  
  //console.log("Output copied to clipboard!")
  
  
  /*setTimeout(() => {
    //output.focus()
    output.select()
    document.execCommand("copy")
    console.log("Output copied to clipboard!")
  }, 0)*/
}

// Behaves like an autofocus for the main div
// COMMENT OUT WHILE DEBUGGING
window.onload = (() => {
  //focusInput()
 
})

/*function re(string, flags='gim') { // global, case insensitive, multiline
	return new RegExp(string, flags)
}*/

/* --- TO DO ---

- Reference a "usage" key to each block in "blocks", to then generate an HTML table with block.name, block.usage and block.ts as their columns, to create a documentation of all available blocks.
Get inspiration from docs.carl.gg
<https://docs.carl.gg/tags-and-triggers/ccs/>

*/
let cat = {
	embed: "Embed Blocks",
	dobj: "Discord Object Properties",
	beh: "Behavior/Action Blocks",
	newb: "New Blocks",
	alias: "Shorter Alias"
}

const blocks = [
  // Embed blocks
	{
		name: "Embed Timestamp",
		desc: "Sets the Embed's Dynamic Timestamp to the current datetime in the footer, like Discord does natively above messages.",
		category: cat.embed,
		reg: /{(e|em|embed)\((ts|time|timestamp)\)(:now)?}/gim, // RegExp,
		example: "{em(ts)}",
		structure: {
			block: ["e", "em", "embed"],
			parameter: {
				content: ["ts", "time", "timestamp"],
				required: true,
			},
			payload: {
				content: [":now"],
				required: false
			}
		},
		ts: "{embed(timestamp):now}" // TagScript result
	},
	{
		name: "Embed Color",
		desc: "Sets the Embed's side color to the hex code provided. Don't forget the \"#\" sign in the hex code.",
		category: cat.embed,
		reg: /{(e|em|embed)\((clr|color|c)\):([#]?.*)}/gim,
		example: "{e(c):#eeaaee}",
		ts: "{embed(color):$3}",
		structure: {
			block: ["e", "em", "embed"],
			parameter: {
				content: ["clr", "color", "c"],
				required: true,
			},
			payload: {
				content: ["#hex_code"],
				required: true
			}
		},
	},
  {
		name: "Embed Title",
		desc: "Sets the Embed's title to whatever content you specify.",
		category: cat.embed,
		reg: /{(e|em|embed)\((title|t)\):(.*[^\}])}/gim,
		example: "{em(t):My title}",
		ts: "{embed(title):$3}",
		structure: {
			block: ["e", "em", "embed"],
			parameter: {
				content: ["title", "t"],
				required: true,
			},
			payload: {
				content: ["content"],
				required: true
			}
		},
	},
  {
		name: "Embed Description",
		desc: "Sets the Embed's description to whatever you specify.",
		category: cat.embed,
		reg: /{(e|em|embed)\((desc|description|d)\):(.*[^\}])}/gim,
		example: "{em(d):My description}",
		ts: "{embed(description):$3}",
		structure: {
			block: ["e", "em", "embed"],
			parameter: {
				content: ["desc", "description", "d"],
				required: true,
			},
			payload: {
				content: ["content"],
				required: true
			}
		},
	},
  {
		name: "Embed URL",
		desc: "Sets the embed title's URL to the URL specified. The link must be an HTTP-formatted URL (begins with \"http://\" or \"https://\")",
		category: cat.embed,
		reg: /{(e|em|embed)\((url|u)\):(.*[^\}])}/gim,
		example: "{em(u):https://carl.gg/}",
		ts: "{embed(URL):$3}",
		structure: {
			block: ["e", "em", "embed"],
			parameter: {
				content: ["url", "u"],
				required: true,
			},
			payload: {
				content: ["URL"],
				required: true
			}
		},
	},
	{
		name: "Word Length",
		desc: "Bored of hardcoding index blocks to check the word length of something? This block generates it for you! Returns the amount of space-separated words in the given content.\nIt is recommended to put it inside of a variable to store its value and reuse it somewhere else.",
		category: cat.newb,
		reg: /{(len|length):(({(([^{}]+)*)}|(([^{}]+)*))*)}/gim,
		example: "{=(length):{len:{myvar}}}",
		ts: "{index(!%&):$2 !%&}",
		structure: {
			block: ["len", "length"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: ["content"],
				required: true
			}
		}
	},
  {
		name: "Digit separator",
		desc: "Adds a comma every 3 digits in the provided number or variable's content. Generates an \"ord\" block with \"replace\" blocks to remove its default ordinal suffixes.",
		category: cat.newb,
		reg: /{(ds|dc):(.*[^}])}/gim,
		example: "{=(myNum):{ds:15000}}",
		ts: "{replace(st,):{replace(nd,):{replace(rd,):{replace(th,):{ord:$2}}}}}",
		structure: {
			block: ["ds", "dc"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: ["content"],
				required: true
			}
		}
	},
	{
		name: "Replace Block",
		desc: "Short alias to the replace block.",
		category: cat.alias,
		reg: /{(r|rep)\((.*),(.*)\):(.*[^\}])}/gim,
		example: "{r(a,b):substance}",
		ts: "{replace($2,$3):$4}",
		structure: {
			block: ["r", "rep"],
			parameter: {
				content: ["to_replace,with"],
				required: true,
			},
			payload: {
				content: ["content"],
				required: true
			}
		}
	},
	{
		name: "Index Block",
		desc: "Short alias to the index block.",
		category: cat.alias,
		reg: /{i\((.*)\):(.*[^\}])}/gim,
		example: "{i(pasta):I love pasta and fruits.}",
		ts: "{index($1):$2}",
		structure: {
			block: ["i"],
			parameter: {
				content: ["element"],
				required: true,
			},
			payload: {
				content: ["list of elements"],
				required: true
			}
		}
	},
	{
		name: "List Block",
		desc: "Short alias to the list block.",
		category: cat.alias,
		reg: /{(l|li)\((.*)\):(.*[^\}])}/gim,
		example: "{li(2):{join(~):{args}}}",
		ts: "{list($2):$3}",
		structure: {
			block: ["l", "li"],
			parameter: {
				content: ["index"],
				required: true,
			},
			payload: {
				content: ["list of elements"],
				required: true
			}
		}
	},
	{
		name: "Cycle Block",
		desc: "Short alias to the cycle block.",
		category: cat.alias,
		reg: /{cyc\((.*)\):(.*[^\}])}/gim,
		example: "{cyc({strf:%-d}):A different~message~everyday!}",
		ts: "{cycle($1):$2}",
		structure: {
			block: ["cyc"],
			parameter: {
				content: ["seed"],
				required: false,
			},
			payload: {
				content: ["list of elements"],
				required: true
			}
		}
	},
	{
		name: "Stop Block",
		desc: "Prevents the tag from executing at all (including command blocks), while outputting an optional error message, conditionally.\nGenerates a conditional blacklist on the everyone role, while including the \"blank variable\" for you.",
		category: cat.newb,
		reg: /{stop\((.*)\):(.*)}/gim,
		example: "{stop(=={1}):Please say something along with the command!}",
		ts: "{=():}\n{{if($1):blacklist($2):{server(id)}}}",
		structure: {
			block: ["stop"],
			parameter: {
				content: ["boolean expression"],
				required: true,
			},
			payload: {
				content: ["error_message"],
				required: false
			}
		}
	},
  // Discord Object Properties
	// USER
	{
		name: "User Name",
		desc: "Returns the username of the user using the tag.",
		category: cat.dobj,
		reg: /{(u|user)\((name|n)\)}/gim,
		example: "{u(n)}",
		ts: "{user(name)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["name", "n"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Avatar",
		desc: "Returns the avatar URL of the user using the tag.",
		category: cat.dobj,
		reg: /{(u|user)\((avatar|av|icon|pfp|a)\)}/gim,
		example: "{u(pfp)}",
		ts: "{user(icon)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["avatar", "av", "icon", "pfp", "a"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User ID",
		desc: "Returns the ID of the user using the tag.",
		category: cat.dobj,
		reg: /{(u|user)\((id|i)\)}/gim,
		example: "{u(id)}",
		ts: "{user(id)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["id", "i"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Mention",
		desc: "Returns a formatted mention of the user using the tag, such as <@!user_id>.",
		category: cat.dobj,
		reg: /{(u|user)\((mention|m|ping)\)}/gim,
		example: "{u(ping)}",
		ts: "{user(mention)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["mention", "m", "ping"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Created At",
		desc: "Returns the account creation date and time of the user using the tag.",
		category: cat.dobj,
		reg: /{(u|user)\((created_at|cat|c_at|created|cr)\)}/gim,
		example: "{u(cat)}",
		ts: "{user(created_at)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["cat", "c_at", "created", "created_at", "cr"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Joined At",
		desc: "Returns the server join date and time of the user using the tag.",
		category: cat.dobj,
		reg: /{(u|user)\((joined_at|jat|j_at|joined)\)}/gim,
		example: "{u(jat)}",
		ts: "{user(joined_at)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["jat", "j_at", "joined", "joined_at"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Color",
		desc: "Returns the hexadecimal color of the user's highest role's color, with the \"#\" sign before it.",
		category: cat.dobj,
		reg: /{(u|user)\((c|clr|color|colour)\)}/gim,
		example: "{u(c)}",
		ts: "{user(color)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["c", "clr", "color", "colour"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Role IDs",
		desc: "Returns a space-separated list of all the roles IDs the user of the tag currently has in the server.\nThe roles IDs are listed from lowest to highest in the roles hierarchy.",
		category: cat.dobj,
		reg: /{(u|user)\((roles|roleids|rid|r)\)}/gim,
		example: "{u(rid)}",
		ts: "{user(roleids)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["roles", "roleids", "rid", "r"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "User Position",
		desc: "Returns the user position in the role hierarchy. Position starts with 0 for @everyone at the bottom and increases by 1 for each role in the server going upwards.",
		category: cat.dobj,
		reg: /{(u|user)\((position|pos|p)\)}/gim,
		example: "{u(pos)}",
		ts: "{user(position)}",
		structure: {
			block: ["u", "user"],
			parameter: {
				content: ["position", "pos", "p"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	// TARGET
	{
		name: "Target Name",
		category: cat.dobj,
		reg: /{(t|tar|target)\((name|n)\)}/gim,
		example: "{t(n)}",
		ts: "{target(name)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["name", "n"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Avatar",
		category: cat.dobj,
		reg: /{(t|tar|target)\((avatar|av|icon|pfp|a)\)}/gim,
		example: "{tar(av)}",
		ts: "{target(icon)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["avatar", "av", "icon", "pfp", "a"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target ID",
		category: cat.dobj,
		reg: /{(t|tar|target)\((id|i)\)}/gim,
		example: "{target(i)}",
		ts: "{target(id)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["id", "i"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Mention",
		category: cat.dobj,
		reg: /{(t|tar|target)\((mention|m|ping)\)}/gim,
		example: "{t(m)}",
		ts: "{target(mention):$3}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["mention", "m", "ping"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Created At",
		category: cat.dobj,
		reg: /{(t|tar|target)\((created_at|cat|c_at|created|c)\)}/gim,
		example: "{tar(c)}",
		ts: "{target(created_at)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["c", "cat", "c_at", "created", "created_at"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Joined At",
		category: cat.dobj,
		reg: /{(t|tar|target)\((joined_at|jat|j_at|joined|j)\)}/gim,
		example: "{t(j)}",
		ts: "{target(joined_at)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["j", "jat", "j_at", "joined", "joined_at"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Color",
		desc: "Returns the hexadecimal color of the user's highest role's color, with the \"#\" sign before it.",
		category: cat.dobj,
		reg: /{(t|tar|target)\((c|clr|color|colour)\)}/gim,
		example: "{t(c)}",
		ts: "{target(color)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["c", "clr", "color", "colour"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Role IDs",
		category: cat.dobj,
		reg: /{(t|tar|target)\((roles|roleids|rid|r)\)}/gim,
		example: "{t(r)}",
		ts: "{target(roleids)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["roles", "roleids", "rid", "r"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Target Position",
		category: cat.dobj,
		reg: /{(t|tar|target)\((position|pos|p)\)}/gim,
		example: "{t(p)}",
		ts: "{target(position)}",
		structure: {
			block: ["t", "tar", "target"],
			parameter: {
				content: ["position", "pos", "p"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	// SERVER
	{
		name: "Server Icon",
		category: cat.dobj,
		reg: /{(s|server|serv)\((icon|avatar|av|pfp)\)}/gim,
		example: "{s(av)}",
		ts: "{server(icon)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["icon", "avatar", "av", "pfp"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server ID",
		category: cat.dobj,
		reg: /{(s|server|serv)\((id|i)\)}/gim,
		example: "{serv(id)}",
		ts: "{server(id)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["id", "i"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Owner",
		category: cat.dobj,
		reg: /{(s|server|serv)\((owner|o|ow|own)\)}/gim,
		example: "{s(o)}",
		ts: "{server(owner)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["owner", "o", "ow", "own"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Random",
		category: cat.dobj,
		reg: /{(s|server|serv)\((random|rand|r)\)}/gim,
		example: "{serv(rand)}",
		ts: "{server(random)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["random", "rand", "r"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Members",
		category: cat.dobj,
		reg: /{(s|server|serv)\((members|m|membercount)\)}/gim,
		example: "{s(membercount)}",
		ts: "{server(members)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["members", "m", "membercount"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Humans",
		category: cat.dobj,
		reg: /{(s|server|serv)\((humans|h)\)}/gim,
		example: "{s(h)}",
		ts: "{server(members)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["humans", "h"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Roles",
		category: cat.dobj,
		reg: /{(s|server|serv)\((roles|rolecount|rolescount)\)}/gim,
		example: "{s(rolecount)}",
		ts: "{server(roles)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["roles", "rolecount", "rolescount"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Channels",
		category: cat.dobj,
		reg: /{(s|server|serv)\((channels|chan|chancount)\)}/gim,
		example: "{s(chan)}",
		ts: "{server(channels)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["channels", "chan", "chancount"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Server Created At",
		category: cat.dobj,
		reg: /{(s|server|serv)\((created_at|created|cat|c_at|c)\)}/gim,
		example: "{serv(created)}",
		ts: "{server(created_at)}",
		structure: {
			block: ["s", "server", "serv"],
			parameter: {
				content: ["c", "cat", "c_at", "created", "created_at"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	 // CHANNEL
	{
		name: "Channel ID",
		category: cat.dobj,
		reg: /{(ch|channel|chan)\((id|i)\)}/gim,
		example: "{ch(id)}",
		ts: "{channel(id)}",
		structure: {
			block: ["ch", "channel", "chan"],
			parameter: {
				content: ["id", "i"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Channel Topic",
		category: cat.dobj,
		reg: /{(ch|channel|chan)\((topic|t|subject)\)}/gim,
		example: "{chan(t)}",
		ts: "{channel(topic)}",
		structure: {
			block: ["ch", "channel", "chan"],
			parameter: {
				content: ["topic", "t", "subject"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Channel Slowmode",
		category: cat.dobj,
		reg: /{(ch|channel|chan)\((slowmode|slow|s|sl)\)}/gim,
		example: "{chan(sl)}",
		ts: "{channel(slowmode)}",
		structure: {
			block: ["ch", "channel", "chan"],
			parameter: {
				content: ["slowmode", "slow", "s", "sl"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Channel Position",
		category: cat.dobj,
		reg: /{(ch|channel|chan)\((position|pos|p)\)}/gim,
		example: "{ch(pos)}",
		ts: "{channel(position)}",
		structure: {
			block: ["ch", "channel", "chan"],
			parameter: {
				content: ["position", "pos", "p"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Channel Mention",
		category: cat.dobj,
		reg: /{(ch|channel|chan)\((mention|men|m|ping)\)}/gim,
		example: "{ch(men)}",
		ts: "{channel(mention)}",
		structure: {
			block: ["ch", "channel", "chan"],
			parameter: {
				content: ["mention", "men", "m", "ping"],
				required: true,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	// -- ACTION BLOCKS --
	{
		name: "Silent",
		category: cat.beh,
		reg: /{sil}/gim,
		example: "{sil}",
		ts: "{silent}",
		structure: {
			block: ["sil"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Override",
		category: cat.beh,
		reg: /{(ov|over|overr|oride)}/gim,
		example: "{over}",
		ts: "{override}",
		structure: {
			block: ["ov", "over", "overr", "oride"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: [],
				required: false
			}
		}
	},
	{
		name: "Redirect",
		category: cat.beh,
		reg: /{(redir|red):(.*)}/gim,
		example: "{redir:456625369974308866}",
		ts: "{redirect:$2}",
		structure: {
			block: ["redir", "red"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: ["channel_id"],
				required: true
			}
		}
	},
	{
		name: "Require",
		category: cat.beh,
		reg: /{req\((.*)\):(.*)}/gim,
		example: "{req(<#{cmdChan}> channel only!):{cmdChan}}",
		ts: "{require($1):$2}",
		structure: {
			block: ["req"],
			parameter: {
				content: ["error_message"],
				required: false,
			},
			payload: {
				content: ["roles_id,channels_id"],
				required: true
			}
		}
	},
	{
		name: "Blacklist",
		category: cat.beh,
		reg: /{bl\((.*)\):(.*)}/gim,
		example: "{bl(You can't use this command, fam):672778567980941323}",
		ts: "{blacklist($1):$2}",
		structure: {
			block: ["bl"],
			parameter: {
				content: ["error_message"],
				required: false,
			},
			payload: {
				content: ["roles_id,channels_id"],
				required: true
			}
		}
	},
	{
		name: "Comment Block",
		desc: "Adds a comment variable that never gets called and is only informative, for you or your users to read while going through your code.",
		category: cat.newb,
		reg: /{\/:(.*)}/gim,
		example: "{/:I am a comment, just for me to read}",
		ts: "{=(COMMENT):$1}",
		structure: {
			block: ["/"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: ["comment"],
				required: false
			}
		}
	},
	{
		name: "Variable Assignment Alias",
		desc: "Creates a variable with a much shorter and SCSS-like way, with a dollar sign before it.\nIt is not really too \"TagScripty\" but it's shorter so I'll take it.",
		category: cat.newb,
		reg: /{(\$|=)([^(){}]*):(.*)}/gim,
		example: "{$myvar:Some content}",
		ts: "{=($2):$3}",
		structure: {
			block: ["$", "=[variable_name]"],
			parameter: {
				content: [],
				required: false,
			},
			payload: {
				content: ["content"],
				required: false
			}
		}
	}
]

function generateUsage() {
	// A function that generate a block's usage based on its block.structure object.
	// Returns something like "{<em|embed>(<ts|time|timestamp>)[:now]}"
	// Takes the current block's object it is looping through in the blocks array as an argument

	let debug = []
	
  const table = document.querySelector('#table-docs')
  
  // Sorts the blocks array of objects alphabetically, per block name
  // before looping through it, to generate the table in alphabetical order
  const sortedBlocks = blocks.sort((a, b) => (a.name > b.name) ? 1 : -1)
  
	sortedBlocks.forEach((block, index) => {
		let param = block.structure.parameter
		let pay = block.structure.payload
		let name = block.structure.block.join("|")
    let cat = block.category
    let example = block.example
		
		let usage = ""; // {block(param):payload}
		// {t|target|tar(<param1|param2>):<payload>}
		
		let fparam = ""; // (param)
		let fpayload = ""; // :payload
		
		if (param.content.length) { // is not empty
			// "(<param1|param2>)" or "([param1|param2])"
			fparam = `(${param.required ? "<" : "["}${param.content.join("|")}${param.required ? ">" : "]"})`
		}

		if (pay.content.length) { // is not empty
			// ":<payload>" or ":[payload]"
			fpayload = `:${pay.required ? "<" : "["}${pay.content.join("|")}${pay.required ? ">" : "]"}`
		}

		usage = "{" + name + fparam + fpayload + "}"
		
      
      // Generates each row/line of the table and its cells
      let row = table.insertRow(index)
      row.classList.add("tableRow")
      
      /*
      // block tooltip addition
      let toolTip = document.createElement('div')
      toolTip.classList.add("blockTooltip")
      row.appendChild(toolTip)
      */
      
      let cellBlock = row.insertCell(0)
      let cellCat = row.insertCell(1)
      let cellUsage = row.insertCell(2)
      let cellExample = row.insertCell(3)
      
      cellBlock.textContent = block.name
      cellCat.textContent = cat
    
      let usageMd = document.createElement('p')
      cellUsage.appendChild(usageMd)
      usageMd.textContent = usage
    
      let exampleMd = document.createElement('p')
      cellExample.appendChild(exampleMd)
      exampleMd.textContent = example
    
      row.classList.add("item")
      usageMd.classList.add("md")
      exampleMd.classList.add("md")
      exampleMd.classList.add("copiable")
      

		// Actually adds a `usage` key to the current block, with our generated usage.
		//block.usage = usage
		//debug.push("{" + usage + "}")
	})
  
  // Table header creating and appending
  let header = table.createTHead()
  header.classList.add("darkHead")
  let headRow = header.insertRow(0)
  
  let headerBlock = headRow.appendChild(document.createElement("th"))
  let headerCat = headRow.appendChild(document.createElement("th"))
  let headerUsage = headRow.appendChild(document.createElement("th"))
  let headerExample = headRow.appendChild(document.createElement("th"))
  
  /*let headerBlock = headRow.insertCell(0)
  let headerCat = headRow.insertCell(1)
  let headerUsage = headRow.insertCell(2)
  let headerExample = headRow.insertCell(3)*/
      
  headerBlock.textContent = "Block"
  headerCat.textContent = "Category"
  headerUsage.textContent = "Usage"
  headerExample.textContent = "Example"
	//return debug
  
  headerBlock.id = "headerBlock"
  headerCat.id = "headerCat"
  headerUsage.id = "headerUsage"
  headerExample.id = "headerExample"
}

generateUsage()

//console.log(generateUsage()) // mutates "blocks" to add "usage" for each block

//let myCode = "{em(ts)}\n{em(clr):#eeaaee}\n{=(le):{len:{args}}}\n{stop(this==that):error_message}\n{r(a,b):{args}}" // c

// Actually performs the code replacement when called, based on each block's regex and TagScript equivalent. Returns a new string, replaced.
function process(code) {
	let processed = code;
	blocks.forEach(block => {
		processed = processed.replace(block.reg, block.ts).replace("\n", "\n")
	})
	return processed
}

//input.textContent = "{Test}"
function buttonPress() {
  processBtn.classList.remove("notify")
  
  //let inputCode = input.innerText
  let inputCode = input.innerText
  let outputCode = inputCode == "" ? defaultOutput : process(inputCode)
  output.innerText = outputCode
  //console.log(`Base code\n${inputCode}\n\nOutput code\n${outputCode}`)
  
  // Changes the character count for the output  
  let outputLength = output.textContent.length
  //const outputID = document.querySelector('#output')
  output.setAttribute('data-value', outputLength)
  // Hides the char count when 0
  if (outputLength == 0 || output.textContent == defaultOutput) { 
    output.setAttribute('data-value', "")
  }
}

function mstos(sec) {
  return sec*1000;
}

// Keyboard Shortcuts Management
input.addEventListener('keydown', (e) => {
  const kp = "keyPressed"
  let duration = mstos(0.3)// in ms
  if (e.ctrlKey && e.key == ',') { // checks if "Ctrl + !" is pressed
    const keyBtn = document.querySelector("#keyBtn")
      setTimeout(() => { 
        // toggle the class every 
        keyBtn.classList.add(kp);  
        setTimeout(() => {
           // toggle another class
           keyBtn.classList.remove(kp);  
           }, duration)
      }, 0);
        setTimeout(keyBtn.classList.add("keyPressed"), 1000)
    
    // one-time process (like the button does)
    buttonPress()
  } else if (e.ctrlKey && e.key == '*') {
    const keyRT = document.querySelector("#keyRT")
    
    setTimeout(() => { 
        // toggle the class every 
        keyRT.classList.add(kp);
        setTimeout(() => {
           // toggle another class
           keyRT.classList.remove(kp);  
           }, duration)
    }, 0);
    
    // toggles real-time processing
    checkbox.checked = !checkbox.checked
    // Forces a one-time process as soon as real-time processing is enabled
    // Otherwise the user had to start typing for it to trigger
    buttonPress()
  } else if (e.ctrlKey && e.key == "ArrowUp") {
    console.log("ctrl & up")
    scrollToTop()
  }
})

function realTimeProcessing() {
  
  // Adds a balanced or unabalanced character next to the char count
  // depending on the amount of opening and closing brackets in the input
  let iptxt = input.textContent
  let inputOpening = iptxt.split("{").length - 1
  let inputClosing = iptxt.split("}").length - 1
  
  let inputBalanced = inputOpening == inputClosing
  
  let balancedChar = inputBalanced ? char.balanced : char.unbalanced
  
  // Changes the character count for the input
  let codeLength = input.textContent.length
  //const inputID = document.querySelector('#input')
  input.setAttribute('data-value', codeLength + " " + balancedChar)
  // Hides the char count when 0
  if (codeLength == 0) { 
    input.setAttribute('data-value', "")
  }
  
  // Adds a little notify circle on the Process button
  // whenever the input is different from the output
  // to add a visual indicator to remind to process
  if (input.textContent != output.textContent) {
    if (!processBtn.classList.contains("notify")) {
      processBtn.classList.add("notify")
    }
  }
  
  // Toggles real time processing
  if (checkbox.checked) {
    buttonPress()
  }
}

//console.log(`--Base code --\n${myCode}\n\n-- Processed --\n${process(myCode)}`)

// Input example to paste
/*

{em(t):My title} {em(d):My description}
{em(u):https://carl.gg/}
{em(ts)} {em(clr):#eeaaee}
{=(le):{len:{args}}}
{stop(this==that):error_message}
{=(rep):{r(a,b):absolutely}}
{=(n):{ds:123456}}

{redir:{mychan}} {req(Error message):playground}
{sil} {over}
{u(i)} {u(r)} {u(a)} {u(pfp)} {u(m)}
{t(c)} {s(icon)} {s(rand)} {s(c)}
{ch(t)}

*/