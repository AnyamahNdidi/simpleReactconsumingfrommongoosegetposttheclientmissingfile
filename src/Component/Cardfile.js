import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import img from '../img/n4.jpg'
import { axios } from '../axios';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
      marginTop:30,
    },

  });

function Cardfile() {
    const classes = useStyles();
    const [presentState, setpresentState] =  useState([])
    const [searchState, setSearchState] = useState([])
    const [input, setInput] = useState("");

    const getDate = async ()=>{
        const result = await axios.get('')
        console.log(result)
        if(result.data){
            return setpresentState(result.data)
        }

    }

    const checkInput = async () =>{
        console.log(input)
        
        const result = await axios.get(`/${input}`)
        console.log(result)
        if(result.data){
            return setSearchState(result.data);
        }
    }

    useEffect(()=>{
        getDate();
        checkInput();
    }, []);
    return (
       <>
          <div className={classes.margin}>

              <Grid container spacing={1} alignItems="flex-end">
               <Grid item>
                   <SearchIcon/>

                     </Grid>
                      <Grid item>
                   <TextField id="input-with-icon-grid" label="With a grid" 
                   value={input}
                   onChange ={(e) => setInput(e.target.value)}
                
                   
                   />
                   <Button 
                   onClick={checkInput}
                   variant="outlined" color="secondary">
                    Search
                </Button>
             </Grid>
             </Grid>
          </div>
         

         
    
       {
           
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={searchState.avatar_url}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {searchState.login}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                public_repos: {searchState.public_repos}
              {""}
              <Typography>followers: {searchState.followers}</Typography>
              <Typography>following: {searchState.following}</Typography>
              {""}
              {""}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
           
       }
       </>

    )
}

export default Cardfile
