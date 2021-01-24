import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../img/img-7.png'
import { axios } from '../axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

function Cardfile2() {
    const classes = useStyles();
    const [currentState, setccurrentState] = useState([])
    const [inputs, setInputs] = useState("")
    const [searchState, setSearchState] = useState([])

    const handlerInput = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const getDate = async ()=>{
        const res = await axios.get("/")
        console.log(res)
        if(res.data){
            return setccurrentState(res.data)
        }
    }

    const checkInput = async ()=>{
        console.log(inputs)
        const result = await axios.get(`/${inputs}`)
        console.log(result)
        if(result.data){
            return setSearchState(result.data)
        }

    }

    useEffect(()=>{
        getDate()
    }, [])
    return (
       <>
        <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
          <SearchIcon/>
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" 
            // value={inputs}
            onChange = {handlerInput}
            // onChange ={(e) => setInputs(e.target.value)}
            />
          </Grid>
          <Button 
                onClick={checkInput}
                variant="outlined" color="secondary">
                 Search
             </Button>
        </Grid>
                 
      </div>
       {
          
                <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={searchState.avatar_url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {searchState.login}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             {searchState.email}
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

export default Cardfile2
