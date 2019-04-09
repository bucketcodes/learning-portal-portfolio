import React from "react"
import { connect } from "react-redux"
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import { Paper, Typography, Card, CardMedia, CardContent, Divider, Button, SvgIcon } from "@material-ui/core";
import dog from '../../dog.jpg'
import PropTypes from 'prop-types'
import {subjectList, periodList, gradeLevel} from '../../app/const/selectors'
import { Link } from "react-router-dom";



const mapState = (state) => {
    let lesson = {}
    let user = {}

    if (state.firestore.ordered.lessons && state.firestore.ordered.users && state.firestore.ordered.lessons[0]&& state.firestore.ordered.users[0]){
        lesson = state.firestore.ordered.lessons[0]
        user = state.firestore.ordered.users[0]
        
    }

    return {
        lesson,
        user,
        account: state.firebase.auth

    }
    
}

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    border: {
        overflow: 'hidden',
        borderRadius: '15px',
        padding: '0'
    },
    topItem: {
        overflow: 'hidden',
        borderRadius: '5px',
        padding: '0',
        boxShadow: '0px 2px 2px rgba(70,70,70,0.5)',
        margin: '0'
    },
    card: {
        
    }
  });

class Lesson extends React.Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }
    componentDidMount() {
        this.forceUpdate()
        const { firestore } = this.context.store
        firestore.get({collection: 'lessons', doc: this.props.match.params.id})
        firestore.get({collection: 'users', doc: this.props.match.params.uid})
    }


    findGrade = (grade) => {
        let index2 = gradeLevel.findIndex(i => i.value === grade);
        if (index2 && gradeLevel[index2] !== undefined) {
          return gradeLevel[index2].label;
          
        }else
        {
          return 'Any'
        }
        
    }

    findPeriod = (period) => {
        let index3 = periodList.findIndex(i => i.value === period);
        if (index3 && periodList[index3] !== undefined) {
          return periodList[index3].label;
        }else
        {
          return 'Any Length'
        }
    }
    
    findSubject = (subject) => {
        let index = subjectList.findIndex(x => x.value === subject);
        return subjectList[index].label;
    }

    render(){
    const { classes, lesson, user } = this.props;
    

        return(
            <div style={{maxWidth: '1400px', padding: '40px', margin: 'auto'}} className={classes.root}>
            <Grid container spacing={24}>
                
                {lesson.file1 &&
                <Grid item xs={12}>
                    {lesson.file1 && 
                    lesson.file1.slice((lesson.file1.lastIndexOf(".") - 1 >>> 0) + 2).includes('jpg' || 'png') &&
                    <img className={classes.topItem}  alt="file1" style={{width: '100%', maxHeight: '600px', objectFit: 'cover'}} src={lesson.file1}/>
                    }
                    {lesson.file1 && 
                    lesson.file1.slice((lesson.file1.lastIndexOf(".") - 1 >>> 0) + 2).includes('mp4' || 'mov') &&
                    <video className={classes.topItem} controls style={{width: '100%'}} src={lesson.file1} />
                    }
                </Grid>}
                <Grid item xs={12} sm={3} lg={2} style={{position: 'sticky'}}>
                    <Card className={classes.card} >
                        <CardMedia 
                            component='img'
                            alt='profile'
                            className={classes.profilePhoto}
                            image={user && user.photoURL ? user.photoURL : dog}
                            style={{maxHeight: 160, objectFit: 'cover'}}
                        />
                        {user.fellow && 
                        <SvgIcon style={{zIndex: 9000, fontSize: 120, color: 'gold', position: 'absolute', top:-30,left:-30}}>
                            <path d='M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z' />
                          </SvgIcon>}
                        <CardContent style={{paddingBottom: 10}}>
                            <Typography align='center' style={{fontSize: 18, lineHeight: '18px'}}>{user.name}</Typography>

                            <Divider style={{marginTop: '10px', marginBottom: '15px'}} />
                            <Typography align='center'>Lessons Created: 0</Typography>
                            <Typography align='center'>Lessons Favorited: 0</Typography>

                            <Divider style={{marginTop: '15px', marginBottom: '20px'}} />
                            <Button style={{width: '100%'}} variant='outlined'>View Profile</Button>
                            {this.props.account.uid && this.props.lesson.post_author && this.props.account.uid === this.props.lesson.post_author &&
                            <Link to={`/edit/${this.props.lesson.id}/${this.props.user.id}`} style={{textDecoration: 'none'}}>
                            <Button style={{width: '100%', marginTop: '10px'}} color='secondary' variant='contained'>Edit Lesson</Button>
                            </Link>
                            }

                        </CardContent>
                    </Card>
                    
                </Grid>
                <Grid item xs={12} sm={9} lg={10}>
                    <Paper className={classes.paper}>
                        <Typography align='center' variant='h5'>
                            <b>{lesson.post_title && lesson.post_title}</b>
                        </Typography>
                        <Divider style={{marginTop: 10}}/>
                        <Grid style={{width:'33%', float: 'left', paddingTop: '20px'}}>
                            <Typography align='center'>
                                {lesson.Grade && this.findGrade(lesson.Grade)}
                            </Typography>
                        </Grid>
                        <Grid style={{width:'33%', float: 'right', paddingTop: '20px'}}>
                            <Typography align='center'>
                                {lesson.Period && this.findPeriod(lesson.Period)}
                            </Typography>
                        </Grid>
                        <Grid style={{width:'33%', float: 'right', paddingTop: '20px'}}>
                            <Typography align='center'>
                                {lesson.Subjects && this.findSubject(lesson.Subjects)}
                            </Typography>
                        </Grid>

                        <Divider style={{height: 40, opacity: 0}} />

                        {lesson.rationale && <Grid style={{textAlign: 'left', marginTop: '20px'}}>
                            <Typography variant='h5'>Rationale:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.rationale}} ></div>
                        </Grid>}

                        {lesson.learning_goals && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Learning Goals / Objectives:</Typography>
                            <div style={{maxWidth: '100%', overflow: 'wrap'}} dangerouslySetInnerHTML={{__html: lesson.learning_goals}} ></div>
                        </Grid>}

                        {lesson.standards && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Standards:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.standards}} ></div>
                        </Grid>}

                        {lesson.materials && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Materials:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.materials}} ></div>
                        </Grid>}

                        {lesson.hook && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Anticipatory Set / Hook:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.hook}} ></div>
                        </Grid>}

                        {lesson.direct_instruction && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Direct Instruction:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.direct_instruction}} ></div>
                        </Grid>}

                        {lesson.guided_practice && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Guided Practice:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.guided_practice}} ></div>
                        </Grid>}

                        {lesson.closure && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Closure / Check Understanding:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.closure}} ></div>
                        </Grid>}

                        {lesson.notes && <Grid style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>Notes:</Typography>
                            <div dangerouslySetInnerHTML={{__html: lesson.notes}} ></div>
                        </Grid>}
                        {lesson.customs && lesson.customs.map(custom =>
                            <Grid key={Math.random() * Math.random()} style={{textAlign: 'left', marginTop: '30px'}}>
                            <Typography variant='h5'>{custom.title}:</Typography>
                            <div dangerouslySetInnerHTML={{__html: custom.message}} ></div>
                        </Grid>
                            )}
                    </Paper>
                </Grid>

            </Grid>
            </div>
        )
    }
}

//export default withFirestore(withStyles(styles)(connect(mapState)(Lesson)))
export default compose(
    connect(mapState),
    withStyles(styles)
   )(Lesson)