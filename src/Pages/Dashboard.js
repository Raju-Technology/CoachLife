import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'
import { m } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "./Dashboard.css";
import { Table, Button, Modal, Input, message, Select, DatePicker, Collapse, Card, Col as ColAntd, Row as RowAntd, Carousel } from 'antd'
import { SearchOutlined,CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

//Components
import { fadeIn, fadeInLeft } from '../Functions/GlobalAnimations';
import Header, { HamburgerMenu, HeaderNav } from '../Components/Header/Header';
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import SocialIcons from "../Components/SocialIcon/SocialIcons"
import ReactCustomScrollbar from "../Components/ReactCustomScrollbar"
import { Footer } from "../Components/Footers/Footer"
import { TextAnime } from "../Components/FancyText/FancyText"
import SideButtons from "../Components/SideButtons"
import Blockquote from "../Components/Blockquote/Blockquote"

//Data
import { ProgressBarData01 } from "../Components/ProgressBar/ProgressBarData"

//Images
import RoboticsCoverImage from "../Images/RoboticsCoverImage.png"
import logo2 from "../Images/logo2.png"
import CommentsImg from "../Images/comments.png"
import { render } from "react-dom";

const { TextArea } = Input;
const { Option } = Select;
const { Search } = Input;

const SocialIconsData = [
    {
      link: "https://www.facebook.com/",
      icon: "fab fa-facebook-f"
    },
    {
      link: "https://dribbble.com/",
      icon: "fab fa-dribbble"
    },
    {
      link: "https://twitter.com/",
      icon: "fab fa-twitter"
    },
    {
      link: "https://www.instagram.com/",
      icon: "fab fa-instagram"
    }
  ]

const Dashboard = (props)=>{
  const [searchText, setSearchText] = useState('');

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCoachSummaryVisible, setIsCoachSummaryVisible] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [summaryType, setSummaryType] = useState('');
  const [summary, setSummary] = useState('')
  const navigate = useNavigate()

  const handleBackClick = () => {
    console.log('breadCrum clicked')
    navigate('/select-player');
  };

  const handleStageClick = (stage) => {
    setActiveButton(stage);
  };

  const btnStyle = (stage) => ({
    backgroundColor: activeButton === stage ? 'blue' : 'white',
    color: activeButton === stage ? 'white' : 'black',
    padding: '10px 25px',
    borderRadius: '15px',
  });

  const { RangePicker } = DatePicker;

  const showCoachSummaryModal = (type)=>{
    setSummaryType(type);
    setIsCoachSummaryVisible(true)
  }

  const handleCoachSummaryCancel = () =>{
    setIsCoachSummaryVisible(false)
    setDateRange([null, null]);
    setSummary('')
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

    const location = useLocation();
    const { state } = location;
    console.log(state)
    const { level, stage, playerName, _id, dateOfJoining, primaryCoach, totalPoints, pointsBalance, redeemPoints} = state;


    const handleOkClick = () => {
      setLoading(true)
      const [startDate, endDate] = dateRange;
      fetch('https://zc1w7j8l2a.execute-api.ap-south-1.amazonaws.com/coachlife/CL_CoachParen_Summary', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*',
        // },
        body: JSON.stringify({
          player_id: _id,
          summary_type: summaryType,
          start_date: startDate ? startDate.format('YYYY-MM-DD') : null,
          end_date: endDate ? endDate.format('YYYY-MM-DD') : null
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data.summary);
        setSummary(data.summary);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
    const [addPointsModalVisible, setAddPointsModalVisible] = useState(false);
    const [points, setPoints] = useState(0);
    const [redeemedPoints, setRedeemedPoints] = useState(0)
    const [addRedeemPointsModalVisible, setAddRedeemPointsModalVisible] = useState(false);
    const [completedBonusPoint, setCompletedBonusPoint] = useState(false)
    const [notCompletedBonusPoint, setNotCompletedBonusPoint] = useState(false)
    const [completedRecordKey, setCompletedRecordKey] = useState("")
    const [selectedActivity, setSelectedActivity] = useState("");
    const [documentId, setDocumentId] = useState("")
    const [newComment, setNewComment] = useState("")

    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translatedComment, setTranslatedComment] = useState('')
    const recognitionRef = useRef(null);

    const commentedBy = props.name

    const [playerStatus, setPlayerStatus] = useState(''); 
    const [notCompletedData, setNotCompletedData] = useState(null);
    const [completedData, setCompletedData] = useState(null)
    const [data, setData] = useState(null)
    const [commentsData, setCommentsData] = useState(null)
    const [completedStatus, setCompletedStatus] = useState('')
    const fetchDataUrl = 'https://zzynetwye7.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_FetchAll_PlayerPathway';
    const notCompletedUrl = 'https://wx28mao58e.execute-api.ap-south-1.amazonaws.com/coachlife/CL_fetch_status';
    const completedApiUrl = 'https://wx28mao58e.execute-api.ap-south-1.amazonaws.com/coachlife/CL_fetch_status'
    const fetchCommentsUrl = 'https://vrfz1zhtc5.execute-api.ap-south-1.amazonaws.com/coachlife/CL_Fetch_Comments'
    const deleteCommentsUrl = 'https://msxwerwcse.execute-api.ap-south-1.amazonaws.com/default/CL_Delete_Comments'
    const addCommentsUrl = 'https://y5lw78up63.execute-api.ap-south-1.amazonaws.com/coachlife/Cl_Tn_En_Comments'
    console.log("Completed Data", completedData)
    console.log("Comments Data", commentsData) 
    console.log(documentId)
    console.log("Not Completed: ", notCompletedData)

    // const handlePlayerStatusChange = async (event) => {
    //   const newStatus = event.target.value;
    //   setPlayerStatus(newStatus);
  
    //   if (commentedBy === 'mani') {
    //     try {
    //       const response = await fetch('https://bx02rwe3rd.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_active_update', {
    //         method: 'POST',
    //         // headers: {
    //         //   'Content-Type': 'application/json',
    //         // },
    //         body: JSON.stringify({
    //           player_id: _id,
    //           status: newStatus,
    //         }),
    //       });
  
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
  
    //       const data = await response.json();
    //       console.log('Success:', data);
    //       message.success('Player status updated successfully!');
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   } else {
    //     message.error('You don\'t have admin access to change the player status');
    //   }
    // };

    useEffect(() => {
      if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech reognition. Please use Google Chrome.');
        return;
      }
  
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ta-IN'; // Setting the language to Tamil
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
  
      recognition.onstart = () => {
        console.log('Speech recognition service has started');
      };
  
      recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        if (listening) {
          recognition.start(); // Restart the recognition servie if still listening
        }
      };
  
      recognition.onresult = (event) => {
        const newTranscript = event.results[0][0].transcript;
        setTranscript((prevTranscript) => `${prevTranscript} ${newTranscript}`);
      };
  
      recognitionRef.current = recognition;

    }, [listening]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(notCompletedUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              "player_id": _id,
              "status" : "Not Completed"
             })
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const jsonData = await response.json();
          setNotCompletedData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [completedStatus]); // Empty dependency array means this effect will only run once, equivalent to componentDidMount

    const fetchCompletedData = async () => {
      try {
        const response = await fetch(completedApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "player_id": _id,
            "status" : "Completed"
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setCompletedData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchCompletedData();
    }, [completedStatus]); // Empty dependency array means this effect will only run once, equivalent to componentDidMount
    
    console.log(completedData)


    const fetchData = async () => {
      try {
        const response = await fetch(fetchDataUrl, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },

          body: JSON.stringify({ 
            "player_id": _id
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []); 


    console.log("data", data)

    

    // const dataSource = completedData && completedData.pathway_data ? completedData.pathway_data.map((item)=>{
    //  return{
    //   key: item.player_document_id,
    //   name: item.activity,
    //   topic: item.topic,
    //   status: item.status,
    //   action: "Select Status",
    //   button: "Comments"
    //  }
     
    // }) : []


    // const dataSource1 = notCompletedData && notCompletedData.pathway_data ? notCompletedData.pathway_data.map((item)=>{
    //   return{
    //    key: item.pathwayId,
    //    name: item.activity,
    //    topic: item.topic,
    //    status: "Select Status",
    //    button: "Comments"
    //   }
      
    //  }) : []

    //  const dataSource2 = data && data.completed ? 
    //   Object.values(data.completed).flatMap((subArray) => 
    //       subArray.map((item) => ({
    //           key: item._id,
    //           image: item.image,
    //           name: item.activity,
    //           topic: item.topic,
    //           status: item.status,
    //           action: "Select Status",
    //           button: "Comments"
    //       }))
    //   ) 
    //   : [];

      const dataSource2 = activeButton && data?.completed?.[activeButton]
    ? data.completed[activeButton].map((item) => ({
        key: item._id,
        image: item.image,
        name: item.activity,
        topic: item.topic,
        status: item.status,
        action: "Select Status",
        button: "Comments"
      }))
    : [];

    //  const dataSource3 = data && data.incomplete ? data.incomplete.map((item)=> {
    //   return{
    //     key: item.pathwayId,
    //     name: item.activity,
    //     topic: item.topic,
    //     status: item.status
    //   }
    //  }) : []

    //  const dataSource3 = data && data.incomplete ? 
    //   Object.values(data.incomplete).flatMap((subArray) => 
    //       subArray.map((item) => ({
    //           key: item.pathwayId,
    //           image: item.image,
    //           name: item.activity,
    //           topic: item.topic,
    //           status: item.status,
    //       }))
    //   ) 
    //   : [];

      const dataSource3 = activeButton && data?.incomplete?.[activeButton]
      ? data.incomplete[activeButton].map((item) => ({
          key: item.pathwayId,
          image: item.image,
          name: item.activity,
          topic: item.topic,
          status: item.status,
          // action: "Select Status",
          // button: "Comments"
        }))
      : [];

    

     const handleCompletedStatusChange = async (value, recordKey) => {
      if(value === 'Completed') {
        setCompletedBonusPoint(true);
        setCompletedStatus(value);
        setCompletedRecordKey(recordKey);
        setAddPointsModalVisible(true);
      } else {
        setCompletedStatus(value);
        try {
          const response = await fetch('https://9xhlzs9a29.execute-api.ap-south-1.amazonaws.com/CoachLife/status_update', {
            method: 'POST',
            body: JSON.stringify({
              id: recordKey,
              status: value,
            })
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('API response:', result);
    
          // Update the local state directly
          setData((prevData) => {
            const updatedCompleted = Object.fromEntries(
                Object.entries(prevData.completed).map(([key, subArray]) => [
                    key,
                    subArray.map((item) =>
                        item._id === recordKey ? { ...item, status: value } : item
                    ),
                ])
            );
        
            const updatedIncomplete = Object.fromEntries(
                Object.entries(prevData.incomplete).map(([key, subArray]) => [
                    key,
                    subArray.map((item) =>
                        item.pathwayId === recordKey ? { ...item, status: value } : item
                    ),
                ])
            );
        
            return { ...prevData, completed: updatedCompleted, incomplete: updatedIncomplete };
        });
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };
    
    

    const handleStatusChange = async (value, recordKey) => {
      if(value === 'Completed') {
        setNotCompletedBonusPoint(true);
        setCompletedStatus(value);
        setCompletedRecordKey(recordKey);
        setAddPointsModalVisible(true);
      } else {
        setCompletedStatus(value);
        try {
          const response = await fetch('https://txk2jr1lt9.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_Not_Complete', {
            method: 'POST',
            body: JSON.stringify({
              playerId: _id,
              pathwayId: recordKey,
              status: value,
            })
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('API response:', result);
    
          // Update the local state directly
          setData((prevData) => {
            const updatedCompleted = Object.fromEntries(
                Object.entries(prevData.completed).map(([key, subArray]) => [
                    key,
                    subArray.map((item) =>
                        item._id === recordKey ? { ...item, status: value } : item
                    ),
                ])
            );
        
            const updatedIncomplete = Object.fromEntries(
                Object.entries(prevData.incomplete).map(([key, subArray]) => [
                    key,
                    subArray.map((item) =>
                        item.pathwayId === recordKey ? { ...item, status: value } : item
                    ),
                ])
            );
        
            return { ...prevData, completed: updatedCompleted, incomplete: updatedIncomplete };
        });
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    };
    

    const handleButtonClick = async(recordKey) => {
      console.log("Record Key: ", recordKey)
      setModalVisible(true);
      setDocumentId(recordKey)
      try {
        const response = await fetch(fetchCommentsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "document_id": recordKey,
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setCommentsData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      if (newComment && documentId) {
        handleButtonClick(documentId);
      }
    }, [newComment]);
  
    const handleModalClose = () => {
      setModalVisible(false);
      setDocumentId("")
      setCommentsData(null)
    };

    const handleDeleteButton = async(recordKey)=>{
      try {
        const response = await fetch(deleteCommentsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "_id": recordKey,
          })
        });
        console.log(recordKey)
        handleButtonClick(documentId);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const handleAddComment = async()=> {
      setAddCommentModalVisible(true);
    }

    const handleCommentModalClose = ()=>{
      setAddCommentModalVisible(false);
    }

    const handleSubmitButton = async(documentId)=>{
      console.log(documentId)
      console.log(newComment)
      console.log(commentedBy)
      try {
        const response = await fetch(addCommentsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "document_id": documentId,
            "comment_en":  translatedComment || newComment,
            "comment_tn": transcript,
            "commented_by": commentedBy
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTranscript("")
        setTranslatedComment("")
        setNewComment("")
        setDocumentId("")
        setAddCommentModalVisible(false);
        handleButtonClick(documentId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const columns = [
      // {
      //   title: 'Topic',
      //   dataIndex: 'topic',
      //   key: 'topic',
      //   filters: [
      //     {
      //       text: 'Cue',
      //       value: 'Cue'
      //     },
      //     {
      //       text: 'Lego',
      //       value: 'Lego'
      //     },
      //     {
      //       text: 'Python',
      //       value: 'Python'
      //     },
      //     {
      //       text: 'Lightbot',
      //       value: 'Lightbot'
      //     },
      //     {
      //       text: 'Hardware Engineering',
      //       value: 'Hardware Engineering'
      //     },
      //     {
      //       text: 'Cloud Computing',
      //       value: 'Cloud Computing'
      //     },
      //     {
      //       text: 'Code.org',
      //       value: 'Code.org'
      //     },
      //     {
      //       text: 'Scratch',
      //       value: 'Scratch'
      //     },
      //     {
      //       text: 'Arduino',
      //       value: 'Arduino'
      //     },
      //     {
      //       text: 'Magic of Office',
      //       value: 'Magic of Office'
      //     },
      //     {
      //       text: 'Database',
      //       value: 'Database'
      //     },
      //     {
      //       text: 'Virtual Reality',
      //       value: 'Virtual Reality'
      //     },
      //     {
      //       text: 'Python & Database',
      //       value: 'Python & Database'
      //     },
      //     {
      //       text: 'Arduino Automation',
      //       value: 'Arduino Automation'
      //     },
      //     {
      //       text: 'Introduction to AI',
      //       value: 'Introduction to AI'
      //     },
      //     {
      //       text: 'Basics of Web Technologies',
      //       value: 'Basics of Web Technologies'
      //     }
      //   ],
      //   filterMode: 'tree',
      //   filterSearch: true,
      //   onFilter: (value, record) => record.topic === value,
      // },
      {
        title: 'Activities',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Search
              placeholder="Search activities"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onSearch={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        // width: '25%',
        render: (text, record) => (
          <Select
            defaultValue={text}
            onChange={(value) => handleCompletedStatusChange(value, record.key)}
          >
            <Option value="Completed">Completed</Option>
            <Option value="Not Completed">Not Completed</Option>
            <Option value="In progress">Partially Completed</Option>
          </Select>
        )
      },
      {
        title: 'Status',
        dataIndex:'status',
        key: 'status'
      },
      {
        title: 'Comments',
        dataIndex: 'button',
        key: 'button',
        // width: '25%',
        render: (text, record) => (
          <Button onClick={() => handleButtonClick(record.key)}>
            {text}
          </Button>
        )
      }
    ];

    const columns1 = [
      // {
      //   title: 'Topic',
      //   dataIndex: 'topic',
      //   key: 'topic',
      //   filters: [
      //     {
      //       text: 'Cue',
      //       value: 'Cue'
      //     },
      //     {
      //       text: 'Lego',
      //       value: 'Lego'
      //     },
      //     {
      //       text: 'Python',
      //       value: 'Python'
      //     },
      //     {
      //       text: 'Lightbot',
      //       value: 'Lightbot'
      //     },
      //     {
      //       text: 'Hardware Engineering',
      //       value: 'Hardware Engineering'
      //     },
      //     {
      //       text: 'Cloud Computing',
      //       value: 'Cloud Computing'
      //     },
      //     {
      //       text: 'Code.org',
      //       value: 'Code.org'
      //     },
      //     {
      //       text: 'Scratch',
      //       value: 'Scratch'
      //     },
      //     {
      //       text: 'Arduino',
      //       value: 'Arduino'
      //     },
      //     {
      //       text: 'Magic of Office',
      //       value: 'Magic of Office'
      //     },
      //     {
      //       text: 'Database',
      //       value: 'Database'
      //     },
      //     {
      //       text: 'Virtual Reality',
      //       value: 'Virtual Reality'
      //     },
      //     {
      //       text: 'Python & Database',
      //       value: 'Python & Database'
      //     },
      //     {
      //       text: 'Arduino Automation',
      //       value: 'Arduino Automation'
      //     },
      //     {
      //       text: 'Introduction to AI',
      //       value: 'Introduction to AI'
      //     },
      //     {
      //       text: 'Basics of Web Technologies',
      //       value: 'Basics of Web Technologies'
      //     }
      //   ],
      //   filterMode: 'tree',
      //   filterSearch: true,
      //   onFilter: (value, record) => record.topic === value,
      // },
      {
        title: 'Activities',
        dataIndex: 'name',
        key: 'name',
        // width: '40%',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Search
              placeholder="Search activities"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onSearch={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <Select
            defaultValue={text}
            onChange={(value) => handleStatusChange(value, record.key)}
          >
            <Option value="Completed">Completed</Option>
            <Option value="Not Completed">Not Completed</Option>
            <Option value="In progress">Partially Completed</Option>
          </Select>
        )
      },
    ]


    const Comments = commentsData && commentsData.comments.Comments ? commentsData.comments.Comments.map((item)=>{
      return{
        key: item._id,
        comment: `${item.Comment_Tn}\n ${item.Comment_En}`,
        commentedBy: item.CommentedBy,
        commentedOn: item.CommentedOn,
        button: "Delete"
      }
    }) : []

    const CommentColumns = [
      {
        title: 'Comments',
        dataIndex: 'comment',
        key: 'comment',
        width: '30%',
        render: (text) => (
          <span>
            {text.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </span>
        )
      },
      {
        title: 'Commented By',
        dataIndex: 'commentedBy',
        key: 'commentedBy',
        width: '25%'
      },
      {
        title: 'Commented On',
        dataIndex: 'commentedOn',
        key: 'commentedOn',
        width: '30%'
      },
      {
        dataIndex: 'button',
        key: 'button',
        render: (text, record) => (
          <Button onClick={() => handleDeleteButton(record.key)}>{text}</Button>
        )
      }
    ];

    const handleStopListening = () => {
      setListening(false);
    };

    const handleTranslate = async () => {
      try {
        const response = await fetch('https://jpc8rnngs5.execute-api.ap-south-1.amazonaws.com/coachlife/CL_Translating_EN', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            comment: transcript
          })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        if (data.original_comment && data.translated_comment) {
          setTranscript(data.original_comment);
          setTranslatedComment(data.translated_comment)
        }
        console.log(data); // Handle the response data as needed
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  

  const handleListeningToggle = () => {
    if (listening) {
      recognitionRef.current.stop();
      handleStopListening();
    } else {
      setTranscript('');
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const addPointsModalClose = () => {
    setAddPointsModalVisible(false);
  };

  const addPoints = async() => {
    console.log("Points to add:", points);
    if(completedBonusPoint){
      try {
        const response = await fetch('https://9xhlzs9a29.execute-api.ap-south-1.amazonaws.com/CoachLife/status_update', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify({
            id: completedRecordKey,
            status: completedStatus,
            bonusPoints: `${points}`,
            pointsGivenBy: commentedBy,
            commentForBonus: "Excellent Performance!"
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API response:', result);
        // fetchCompletedData()
        setData((prevData) => {
          const updatedCompleted = Object.fromEntries(
              Object.entries(prevData.completed).map(([key, subArray]) => [
                  key,
                  subArray.map((item) =>
                      item._id === completedRecordKey ? { ...item, status: completedStatus } : item
                  ),
              ])
          );
      
          const updatedIncomplete = Object.fromEntries(
              Object.entries(prevData.incomplete).map(([key, subArray]) => [
                  key,
                  subArray.map((item) =>
                      item.pathwayId === completedRecordKey ? { ...item, status: completedStatus } : item
                  ),
              ])
          );
      
          return { ...prevData, completed: updatedCompleted, incomplete: updatedIncomplete };
      });
        setAddPointsModalVisible(false)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    else if(notCompletedBonusPoint){
      try {
        const response = await fetch('https://txk2jr1lt9.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_Not_Complete', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify({
            playerId: _id,
            pathwayId: completedRecordKey,
            status: completedStatus,
            bonusPoints: `${points}`,
            pointsGivenBy: commentedBy,
            commentForBonus: "Excellent Performance!"
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API response:', result);
        // fetchCompletedData()
        setData((prevData) => {
          const updatedCompleted = Object.fromEntries(
              Object.entries(prevData.completed).map(([key, subArray]) => [
                  key,
                  subArray.map((item) =>
                      item._id === completedRecordKey ? { ...item, status: completedStatus } : item
                  ),
              ])
          );
      
          const updatedIncomplete = Object.fromEntries(
              Object.entries(prevData.incomplete).map(([key, subArray]) => [
                  key,
                  subArray.map((item) =>
                      item.pathwayId === completedRecordKey ? { ...item, status: completedStatus } : item
                  ),
              ])
          );
      
          return { ...prevData, completed: updatedCompleted, incomplete: updatedIncomplete };
      });
        setAddPointsModalVisible(false)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };

  const redeemPointsfun = () => {
    setAddRedeemPointsModalVisible(true);
  };

  const addRedeemPointsModalClose = () => {
    setAddRedeemPointsModalVisible(false);
  };

  const addRedeemPoints = async () => {
    const data = {
      playerId: _id,  
      redeemPoints: `${redeemedPoints}`,
      redeemForWhat: "Reward",
      redeemedBy: commentedBy
    };

    try {
      const response = await fetch('https://7763ulumg9.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_redeem_points', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Points redeemed successfully:', result);

        // Handle success response
      } else {
        console.error('Failed to redeem points');
        // Handle failure response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    } finally {
      addRedeemPointsModalClose();
    }
  };

  // const renderCards = (data1, data2, topic) => {
  //   return [...data1, ...data2]
  //     .filter(item => item.topic === topic)
  //     .map((item, index) => (
  //       <ColAntd span={8} key={index}>
  //         <Card style={{ border: 'none', boxShadow: 'none', marginTop:'5px',marginBottom:'5px' }}>
  //           <img src={logo2} alt="logo" style={{ width: '300px' }} />
  //           <h6>{item.name || 'Untitled Project'}</h6>
  //           <div style={{display:'flex'}}>
  //             <Select value={"Select Action Status"}>
  //               <Option value="Completed">Completed</Option>
  //               <Option value="Not Completed">Not Completed</Option>
  //               <Option value="In progress">In Progress</Option>
  //             </Select>
  //             <p style={{marginLeft:'50px'}}>{item.status}</p>
  //           </div>
  //         </Card>
  //       </ColAntd>
  //     ));
  // };

  const renderCards = (data1, data2, topic, maxRows = 1) => {
    const items = [...data1, ...data2].filter(item => item.topic === topic);
    const rows = [];
    const cardsPerRow = 3;
    const maxCards = maxRows * cardsPerRow;
  
    for (let i = 0; i < maxCards; i += cardsPerRow) {
      const rowItems = items.slice(i, i + cardsPerRow);
      rows.push(
        <RowAntd gutter={16} style={{ marginTop: '10px', backgroundColor: '#4A4A4A', border: 'none' }} key={i}>
          {rowItems.map((item, index) => (
            <ColAntd span={8} key={index}>
              <Card style={{ border: 'none', boxShadow: 'none', marginTop: '5px', marginBottom: '5px' }}>
                <img src={item.image ? item.image : logo2} alt="logo" style={{ width: '250px' }} />
                <h6 style={{fontSize:'18px', marginBottom:'0'}}>{item.name || 'Untitled Project'}</h6>
                <p style={{fontSize:'12px', marginBottom:'10px'}}>Lorem ipsum dolor sit</p>
                <div style={{ display: 'flex' }}>
                <Select
                    value="Select Action Status"
                    onChange={(value) => {
                      if (item.status === "Completed" || item.status === "In progress") {
                        handleCompletedStatusChange(value, item.key);
                      } else if (item.status === "Not Completed") {
                        handleStatusChange(value, item.key);
                      }
                    }}
                  >
                    <Option value="Completed">Completed</Option>
                    <Option value="Not Completed">Not Completed</Option>
                    <Option value="In progress">In Progress</Option>
                 </Select>
                  <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                    <p style={{ marginLeft: '40px' }}>
                      <CheckCircleOutlined style={{ color: item.status === 'Completed' ? 'green' : 'red' }} /> {item.status}
                    </p>
                    <img src={CommentsImg} alt="comments-logo" width="25px" style={{paddingTop:'10px', marginLeft:'auto'}} onClick={() => handleButtonClick(item.key)} />
                  </div>
                </div>
              </Card>
            </ColAntd>
          ))}
        </RowAntd>
      );
    }
  
    return rows;
  };

  const renderCarousel = (data1, data2, topic, startIndex = 3) => {
    const items = [...data1, ...data2].filter(item => item.topic === topic).slice(startIndex);
    const slides = [];
    const cardsPerSlide = 3;
  
    for (let i = 0; i < items.length; i += cardsPerSlide) {
      const slideItems = items.slice(i, i + cardsPerSlide);
      slides.push(
        <div key={i}>
          <RowAntd gutter={16} style={{ marginTop: '10px' }}>
            {slideItems.map((item, index) => (
              <ColAntd span={8} key={index}>
                <Card style={{ border: 'none', boxShadow: 'none', marginTop: '5px', marginBottom: '100px' }}>
                  <img src={item.image ? item.image : logo2} alt="logo" style={{ width: '250px' }} />
                  <h6 style={{fontSize:'18px', marginBottom:'0'}}>{item.name || 'Untitled Project'}</h6>
                  <p style={{fontSize:'12px', marginBottom:'10px'}}>Lorem ipsum dolor sit</p>
                  <div style={{ display: 'flex' }}>
                  <Select
                      value="Select Action Status"
                      onChange={(value) => {
                        if (item.status === "Completed" || item.status === "In progress") {
                          handleCompletedStatusChange(value, item.key);
                        } else if (item.status === "Not Completed") {
                          handleStatusChange(value, item.key);
                        }
                      }}
                    >
                      <Option value="Completed">Completed</Option>
                      <Option value="Not Completed">Not Completed</Option>
                      <Option value="In progress">In Progress</Option>
                    </Select>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                    <p style={{ marginLeft: '40px' }}>
                      <CheckCircleOutlined style={{ color: item.status === 'Completed' ? 'green' : 'red' }} /> {item.status}
                    </p>
                    <img src={CommentsImg} alt="comments-logo" width="25px" style={{paddingTop:'10px', marginLeft:'auto'}} onClick={() => handleButtonClick(item.key)} />
                    </div>
                  </div>
                </Card>
              </ColAntd>
            ))}
          </RowAntd>
        </div>
      );
    }
  
    return (
      <div>
        <Carousel>{slides}</Carousel>
      </div>
    );
  };

// const items = [
//   {
//     key: '1',
//     label: 'Lego',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Lego')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '2',
//     label: 'Cue',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Cue')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '3',
//     label: 'Python',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Python')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '4',
//     label: 'Lightbot',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Lightbot')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '5',
//     label: 'Hardware Engineering',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Hardware Engineering')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '6',
//     label: 'Cloud Computing',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Cloud Computing')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '7',
//     label: 'Code.org',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Code.org')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '8',
//     label: 'Scratch',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Scratch')} columns={columns} pagination={false} />,
//   },
//   {

//     key: '9',
//     label: 'Arduino',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Arduino')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '10',
//     label: 'Magic of Office',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Magic of Office')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '11',
//     label: 'Database',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Database')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '12',
//     label: 'Virtual Reality',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Virtual Reality')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '13',
//     label: 'Python & Database',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Python & Database')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '14',
//     label: 'Arduino Automation',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Arduino Automation')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '15',
//     label: 'Introduction to AI',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Introduction to AI')} columns={columns} pagination={false} />,
//   },
//   {
//     key: '16',
//     label: 'Basics of Web Technologies',
//     children: <Table dataSource={dataSource.filter(item => item.topic === 'Basics of Web Technologies')} columns={columns} pagination={false} />,
//   },
// ];

// const items1 = [
//   {
//     key: '1',
//     label: 'Lego',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Lego')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '2',
//     label: 'Cue',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Cue')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '3',
//     label: 'Python',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Python')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '4',
//     label: 'Lightbot',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Lightbot')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '5',
//     label: 'Hardware Engineering',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Hardware Engineering')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '6',
//     label: 'Cloud Computing',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Cloud Computing')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '7',
//     label: 'Code.org',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Code.org')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '8',
//     label: 'Scratch',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Scratch')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '9',
//     label: 'Arduino',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Arduino')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '10',
//     label: 'Magic of Office',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Magic of Office')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '11',
//     label: 'Database',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Database')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '12',
//     label: 'Virtual Reality',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Virtual Reality')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '13',
//     label: 'Python & Database',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Python & Database')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '14',
//     label: 'Arduino Automation',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Arduino Automation')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '15',
//     label: 'Introduction to AI',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Introduction to AI')} columns={columns1} pagination={false} />,
//   },
//   {
//     key: '16',
//     label: 'Basics of Web Technologies',
//     children: <Table dataSource={dataSource1.filter(item => item.topic === 'Basics of Web Technologies')} columns={columns1} pagination={false} />,
//   },
// ];

// const items2 = [
//   {
//     key: '1',
//     label: 'Lego',
//     children: (
//       <>
//         <Table
//           dataSource={dataSource2.filter(item => item.topic === 'Lego' && (item.status === 'Completed' || item.status === 'In progress'))}
//           columns={columns} 
//           pagination={false}
//           //title={() => 'Completed'}
//         />
//         <Table
//           dataSource={dataSource3.filter(item => item.topic === 'Lego' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           //title={() => 'Not Completed'}
//         />
//         <RowAntd gutter={16} style={{marginTop:'10px'}}>
//             <ColAntd span={8}>
//               <Card>
//                 <img src={logo2} alt="logo" style={{width: '300px'}} />
//                 <h6>Artic Ride</h6>
//                 <Select value="Select Status">
//                   <Option value="Completed">Completed</Option>
//                   <Option value="Not Completed">Not Completed</Option>
//                   <Option value="In progress">Partially Completed</Option>
//                 </Select>
//               </Card>
//             </ColAntd>

//             <ColAntd span={8}>
//               <Card>
//                 <img src={logo2} alt="logo" style={{width: '300px'}} />
//                 <h6>Artic Ride</h6>
//                 <Select value="Select Status">
//                   <Option value="Completed">Completed</Option>
//                   <Option value="Not Completed">Not Completed</Option>
//                   <Option value="In progress">Partially Completed</Option>
//                 </Select>
//               </Card>
//             </ColAntd>

//             <ColAntd span={8}>
//               <Card>
//                 <img src={logo2} alt="logo" style={{width: '300px'}} />
//                 <h6>Artic Ride</h6>
//                 <Select value="Select Status">
//                   <Option value="Completed">Completed</Option>
//                   <Option value="Not Completed">Not Completed</Option>
//                   <Option value="In progress">Partially Completed</Option>
//                 </Select>
//               </Card>
//             </ColAntd>
//         </RowAntd>
//       </>
//     ),
//   },
//   {
//     key: '2',
//     label: 'Cue',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Cue' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Cue' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
          
//         />
//       </>
//     ),
//   },
//   {
//     key: '3',
//     label: 'Python',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Python' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Python' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '4',
//     label: 'Lightbot',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Lightbot' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Lightbot' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '5',
//     label: 'Hardware Engineering',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Hardware Engineering' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Hardware Engineering' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '6',
//     label: 'Cloud Computing',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Cloud Computing' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Cloud Computing' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '7',
//     label: 'Code.org',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Code.org' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Code.org' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '8',
//     label: 'Scratch',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Scratch' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Scratch' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '9',
//     label: 'Arduino',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Arduino ' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Arduino ' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '10',
//     label: 'Magic of Office',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Magic of Office' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Magic of Office' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '11',
//     label: 'Database',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Database' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Database' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '12',
//     label: 'Virtual Reality',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Virtual Reality' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Virtual Reality' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '13',
//     label: 'Python & Database',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Python & Database' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Python & Database' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '14',
//     label: 'Arduino Automation',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Arduino Automation' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Arduino Automation' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '15',
//     label: 'Introduction to AI',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Introduction to AI' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Introduction to AI' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
//   {
//     key: '16',
//     label: 'Basics of Web Technologies',
//     children: (
//       <>
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Basics of Web Technologies' && item.status === 'Completed')}
//           columns={columns} 
//           pagination={false}
//           // title={() => 'Completed Items'}
//         />
//         <Table
//           dataSource={[...dataSource2, ...dataSource3].filter(item => item.topic === 'Basics of Web Technologies' && item.status !== 'Completed')}
//           columns={columns1} 
//           pagination={false}
//           // title={() => 'Other Items'}
//         />
//       </>
//     ),
//   },
// ];


const items2 = [
  {
    key: '1',
    label: <span style={{ color: 'white' }}>Lego</span>,
    showArrow: false,
    children: (
      <>
        {renderCards(dataSource2, dataSource3, 'Lego')}
        {renderCarousel(dataSource2, dataSource3, 'Lego')}
      </>
    ),
  },
  {
    key: '2',
    label: <span style={{ color: 'white' }}>Cue</span>,
    showArrow: false,
    children: (
      <>
       {renderCards(dataSource2, dataSource3, 'Cue')}
       {renderCarousel(dataSource2, dataSource3, 'Cue')}
      </>
    ),
  },
  {
    key: '3',
    label: <span style={{ color: 'white' }}>Python</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Python')}
      {renderCarousel(dataSource2, dataSource3, 'Python')}
     </>
    ),
  },
  {
    key: '4',
    label: <span style={{ color: 'white' }}>Lightbot</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Lightbot')}
      {renderCarousel(dataSource2, dataSource3, 'Lightbot')}
     </>
    ),
  },
  {
    key: '5',
    label: <span style={{ color: 'white' }}>Hardware Engineering</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Hardware Engineering')}
      {renderCarousel(dataSource2, dataSource3, 'Hardware Engineering')}
     </>
    ),
  },
  {
    key: '6',
    label: <span style={{ color: 'white' }}>Cloud Computing</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Cloud Computing')}
      {renderCarousel(dataSource2, dataSource3, 'Cloud Computing')}
     </>
    ),
  },
  {
    key: '7',
    label: <span style={{ color: 'white' }}>Code.org</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Code.org')}
      {renderCarousel(dataSource2, dataSource3, 'Code.org')}
     </>
    ),
  },
  {
    key: '8',
    label: <span style={{ color: 'white' }}>Scratch</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Scratch')}
      {renderCarousel(dataSource2, dataSource3, 'Scratch')}
     </>
    ),
  },
  {
    key: '9',
    label: <span style={{ color: 'white' }}>Arduino</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Arduino')}
      {renderCarousel(dataSource2, dataSource3, 'Arduino')}
     </>
    ),
  },
  {
    key: '10',
    label: <span style={{ color: 'white' }}>Rasberry Pi</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Rasberry Pi')}
      {renderCarousel(dataSource2, dataSource3, 'Rasberry Pi')}
     </>
    ),
  },
  {
    key: '11',
    label: <span style={{ color: 'white' }}>Magic of Office</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Magic of Office')}
      {renderCarousel(dataSource2, dataSource3, 'Magic of Office')}
     </>
    ),
  },
  {
    key: '12',
    label: <span style={{ color: 'white' }}>Database</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Database')}
      {renderCarousel(dataSource2, dataSource3, 'Database')}
     </>
    ),
  },
  {
    key: '13',
    label: <span style={{ color: 'white' }}>Virtual Reality</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Virtual Reality')}
      {renderCarousel(dataSource2, dataSource3, 'Virtual Reality')}
     </>
    ),
  },
  {
    key: '14',
    label: <span style={{ color: 'white' }}>Python & Database</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Python & Database')}
      {renderCarousel(dataSource2, dataSource3, 'Python & Database')}
     </>
    ),
  },
  {
    key: '15',
    label: <span style={{ color: 'white' }}>Arduino Automation</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Arduino Automation')}
      {renderCarousel(dataSource2, dataSource3, 'Arduino Automation')}
     </>
    ),
  },
  {
    key: '16',
    label: <span style={{ color: 'white' }}>Introduction to AI</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Introduction to AI')}
      {renderCarousel(dataSource2, dataSource3, 'Introduction to AI')}
     </>
    ),
  },
  {
    key: '17',
    label: <span style={{ color: 'white' }}>Basics of Web Technologies</span>,
    showArrow: false,
    children: (
      <>
      {renderCards(dataSource2, dataSource3, 'Basics of Web Technologies')}
      {renderCarousel(dataSource2, dataSource3, 'Basics of Web Technologies')}
     </>
    ),
  },
  
];


    return(
        <div style={{backgroundColor:'#4A4A4A'}}>
            <SideButtons />
            {/* <Header className="absolute top-0 left-0 w-full z-10 md:bg-white header-personalportfolio">
                <HeaderNav fluid="fluid" theme="light" className="h-[100px] md:h-[70px] mr-[50px] ml-[35px] md:mx-[15px]" containerClass="md:px-0">
                    <Col lg={2} sm={6} className="col-auto ps-lg-0 me-auto md:!px-0">
                    <Link aria-label="link for" className="flex items-center" to="/">
                        <Navbar.Brand className="inline-block p-0 m-0">
                        <img className="default-logo" width="111" height="36" loading="lazy" src={logo2} alt='logo' />
                        <img className="alt-logo" width="111" height="36" loading="lazy" src={logo2}  alt='logo' />
                        <img className="mobile-logo" width="111" height="36" loading="lazy" src={logo2} alt='logo' />
                        </Navbar.Brand>
                    </Link>
                    </Col>
                    <Col className="col-auto text-end px-0">
                    <HamburgerMenu theme="light" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
                        <Row className="h-full mx-0">
                        <Col lg={12} className="p-0">
                            <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-black">
                            <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                                <ReactCustomScrollbar className="h-full flex justify-center" autoHide>
                                <div>
                                    <ul className="font-serif w-full flex flex-col justify-center h-full">
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/">Login</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/registration">Registration</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/select-player">Select Player</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/update-player">Player Update</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/create-player">Create Player</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/update-status">Update Status</Link></li>
                                    </ul>
                                </div>
                                </ReactCustomScrollbar>
                            </Col>
                            
                            </Row>
                        </Col>
                        </Row>
                    </HamburgerMenu>
                    </Col>
                </HeaderNav>
            </Header> */}
            <div style={{backgroundColor:'white', height:'100px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginLeft:'40px', marginRight:'40px', paddingTop:'20px'}}>
                <div>
                  <img src={logo2} alt="logo" width="150px" /> 
                </div> 

                {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '20px', marginLeft: '10px' }}>
                  <div style={{ width: '25px', height: '3px', backgroundColor: 'black' }}></div>
                  <div style={{ width: '20px', height: '3px', backgroundColor: 'black', marginLeft:'auto', marginRight:'auto'}}></div>
                  <div style={{ width: '25px', height: '3px', backgroundColor: 'black' }}></div>
                </div> */}
                <HamburgerMenu theme="light" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
                        <Row className="h-full mx-0">
                        <Col lg={12} className="p-0">
                            <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-black">
                            <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                                <ReactCustomScrollbar className="h-full flex justify-center" autoHide>
                                <div>
                                    <ul className="font-serif w-full flex flex-col justify-center h-full">
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/">Login</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/registration">Registration</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/select-player">Select Player</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/update-player">Player Update</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/create-player">Create Player</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/update-status">Update Status</Link></li>
                                    <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/leader-board">Leader Board</Link></li>
                                    </ul>
                                </div>
                                </ReactCustomScrollbar>
                            </Col>
                            
                            </Row>
                        </Col>
                        </Row>
                    </HamburgerMenu>

              </div>
            </div>

            {/* <div>
              <img src={logo2} alt="logo" width="111px" style={{marginLeft:'auto', marginRight: '20px', paddingTop:'20px', paddingBottom:'20px'}}/> 
            </div> */}

            <div style={{marginLeft:'40px',marginTop:'40px'}}>
              <button style={{paddingBottom:'20px', color:'white'}} onClick={handleBackClick}>Home > Dashboard</button>
              <p style={{color:'white',paddingBottom:'10px'}}>Level {level} - Stage {stage}</p>

              <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
                  <div style={{width:'20%'}}>
                    <p style={{fontSize: '26px', color:'white'}}>{playerName}</p>
                  </div>

                  <div style={{width:'10%'}}>
                    <p style={{color: 'white'}}>{dateOfJoining}</p>
                  </div>
                  
                  <div style={{width:'20%'}}>
                    <p style={{color:'white'}}>{primaryCoach}</p>
                  </div>
              </div>

              <div style={{marginTop: '10px'}}>
                 <div style={{display: 'flex'}}>
                      <div style={{width: '32%', backgroundColor:'white', borderRadius:'5px', cursor: 'pointer'}}
                          onClick={() => showCoachSummaryModal('coach')}>
                        <p style={{color:'black', padding: '20px 0 30px 10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>Coach Summary</p>
                      </div>
                      <div style={{width: '32%', backgroundColor:'white', marginLeft:'10px', borderRadius:'5px', cursor: 'pointer'}}
                          onClick={() => showCoachSummaryModal('parent')}>
                        <p style={{color:'black', padding: '20px 0 30px 10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>Parent Summary</p>
                      </div>
                      <div style={{width: '32%', backgroundColor:'white', marginLeft:'10px', borderRadius:'5px', cursor: 'pointer'}}
                          onClick={() => showCoachSummaryModal('overall')}>
                        <p style={{color:'black', padding: '20px 0 30px 10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>Overall Summary</p>
                      </div>
                  </div>

                  <div style={{display: 'flex', marginTop: '10px'}}>
                      <div style={{width: '32%', backgroundColor:'white',borderRadius:'5px'}}>
                        <p style={{color:'blue', paddingTop:'20px',paddingLeft:'10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>{totalPoints}</p>
                        <p style={{color: 'black', paddingLeft:'10px', paddingBottom:'20px'}}>Total Default Points</p>
                      </div>
                      <div style={{width: '32%', backgroundColor:'white',borderRadius:'5px',marginLeft:'10px'}}>
                        <p style={{color:'green', paddingTop:'20px',paddingLeft:'10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>{pointsBalance}</p>
                        <p style={{color: 'black', paddingLeft:'10px', paddingBottom:'20px'}}>Remaining Points</p>
                      </div>
                      <div style={{width: '32%', backgroundColor:'white',borderRadius:'5px', marginLeft:'10px'}} onClick={() => redeemPointsfun()}>
                        <p style={{color:'red', paddingTop:'20px',paddingLeft:'10px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>{redeemPoints}</p>
                        <p style={{color: 'black', paddingLeft:'10px', paddingBottom:'20px'}}>Redeem Points</p>
                      </div>
                  </div>

              </div>
            </div>
            

            {/* <div style={{marginTop:'90px',marginLeft:'40px'}}>
              <ArrowLeftOutlined onClick={handleBackClick}  style={{ fontSize: '24px', cursor: 'pointer' }} />
            </div> */}
            
            <div className="dashboard-container" style={{marginTop:'20px'}}>
              {/* <h6 style={{textAlign: 'center'}}>Dashboard</h6>
              <table className="dashboard-table">
                  <thead>
                      <tr>
                          <th style={{fontSize:'12px'}}>{playerName}</th>
                          <th style={{fontSize:'12px'}}>Level-{level}</th>
                          <th style={{fontSize:'12px'}}>Stage-{stage}</th>
                          <th style={{fontSize:'12px'}}>{dateOfJoining}</th>
                          <th style={{fontSize:'12px'}}>{primaryCoach}</th>
                      </tr>
                  </thead>
              </table> */}
              {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>              
                  <Button id="coach" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => showCoachSummaryModal('coach')}>Coach Summary</Button>
                  <Button id="parent" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => showCoachSummaryModal('parent')}>Parent Summary</Button>
                  <Button id="overall" style={{ marginTop: '20px', marginBottom: '20px' }} onClick={() => showCoachSummaryModal('overall')}>Overall Summary</Button>
              </div> */}

              {/* <div style={{display:'flex',justifyContent:'space-between'}}>
                <h6>Total default points: {totalPoints}</h6>
                <h6>Remaining points : {pointsBalance}</h6>
                <Button onClick={()=> redeemPoints()}>Redeem Points</Button>
              </div> */}

              {/* <div style={{marginBottom:'10px'}}>
                <label htmlFor="statusSelect">Player Status: </label>
                <select
                  id="statusSelect"
                  className="select-dropdown"
                  value={playerStatus}
                  onChange={handlePlayerStatusChange}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div> */}
              
              <Modal
                title="Redeem Points"
                visible={addRedeemPointsModalVisible}
                onCancel={addRedeemPointsModalClose}
                footer={[
                  <Button key="add" onClick={addRedeemPoints}>
                    Add Redeem Points
                  </Button>,
                  <Button key="close" onClick={addRedeemPointsModalClose}>
                    Close
                  </Button>
                ]}
                width={900}
              >
                <Input
                  type="number"
                  value={redeemedPoints}
                  onChange={(e) => setRedeemedPoints(e.target.value)}
                  placeholder="Redeem points"
                />
              </Modal>

              <Modal
                title={`${summaryType.charAt(0).toUpperCase() + summaryType.slice(1)} Summary`}
                visible={isCoachSummaryVisible}
                onCancel={handleCoachSummaryCancel}
                footer={[
                  <Button key="cancel" onClick={handleCoachSummaryCancel}>Cancel</Button>,
                  <Button key="ok" onClick={handleOkClick}>Ok</Button>
                ]}
              >
                <RangePicker
                  value={dateRange}
                  placeholder={["Start Date", "End Date"]}
                  style={{ width: '100%', marginBottom: '20px' }}
                  onChange={handleDateRangeChange}
                />
                {loading ? (
                  <div style={{ marginTop: '20px' }}>
                    <h5>Loading...</h5>
                  </div>
                ) : (
                  summary && (
                    <div style={{ marginTop: '20px' }}>
                      <h3>Summary:</h3>
                      <p>{summary}</p>
                    </div>
                  )
                )}
              </Modal>
              {/* <h6>Completed</h6>
              <Collapse items={items} defaultActiveKey={['1']} /> */}
              {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
              {/* <h6 style={{marginTop:'15px'}}>Yet to be Completed</h6>
              <Collapse items={items1} defaultActiveKey={['1']} /> */}

             <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '15px', marginRight: '10px', width: '50%' }}>
                <div>
                  <button
                    style={btnStyle(1)}
                    onClick={() => handleStageClick(1)}
                  >
                    Stage1
                  </button>
                </div>
                <div>
                  <button
                    style={btnStyle(2)}
                    onClick={() => handleStageClick(2)}
                  >
                    Stage2
                  </button>
                </div>
                <div>
                  <button
                    style={btnStyle(3)}
                    onClick={() => handleStageClick(3)}
                  >
                    Stage3
                  </button>
                </div>
              </div>

              <Collapse items={items2} defaultActiveKey={['1']}  style={{marginTop:'25px', backgroundColor:'#4A4A4A' }} bordered={false} className="custom-collapse" />
              {/* <Table dataSource={dataSource1} columns={columns1} pagination={false} /> */}
              <Modal
                  title="Comments"
                  visible={modalVisible}
                  onCancel={handleModalClose}
                  footer={[
                    <Button key="add"  onClick={handleAddComment}>
                      Add Comment
                    </Button>,

                    <Button key="close" onClick={handleModalClose}>
                      Close
                    </Button>
                  ]}
                  width={900}
                >
                  <Table dataSource={Comments} columns={CommentColumns} pagination={false} className="custom-table" />
              </Modal>

              <Modal
                  title="Add Comment"
                  visible={addCommentModalVisible}
                  onCancel={handleCommentModalClose}
                  footer={[
                    <Button onClick={()=>{handleSubmitButton(documentId)}}>Submit</Button>,
                    <Button key="close" onClick={handleCommentModalClose}>
                      Close
                    </Button>
                  ]}
                  width={600} // Set the width of the modal
                >
                  <TextArea
                    rows={4}
                    value={ transcript || newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add your comment here"
                    style={{ resize: 'none' }}
                  />

                  {translatedComment && (
                    <TextArea
                      rows={4}
                      value={translatedComment}
                      placeholder="Translated comment will appear here"
                      style={{ resize: 'none', marginTop: '10px' }}
                      readOnly
                    />
                  )}

                  <Button className="button" onClick={handleListeningToggle} >
                    {listening ? 'Stop' : 'Start'} Listening
                  </Button>
                  <Button style={{marginLeft:'10px'}} onClick={handleTranslate}>Translate</Button>
              </Modal>

              <Modal
                  title="Add Points"
                  visible={addPointsModalVisible}
                  onCancel={addPointsModalClose}
                  footer={[
                    <Button key="add" onClick={addPoints}>
                      Add Points
                    </Button>,
                    <Button key="close" onClick={addPointsModalClose}>
                      Close
                    </Button>
                  ]}
                  width={900}
                >
                  <Input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="Enter points"
                  />
              </Modal>
            </div>

            <section className="py-[160px] overflow-hidden bg-[#ffeb04] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{marginTop:"40px", backgroundColor:"yellow", padding:"50px", color:'black'}}>
              <Container>
                <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.4 } }} >
                  <Col className="col-lg-5 md:mb-20 sm:mb-16">
                    <h2 className="heading-6 font-serif text-darkgray mb-0 leading-[40px] sm:leading-[26px]">Provide<span className="font-semibold"> top gadgets, methodologies, and mechanisms</span> for a fun learning experience, introducing technical concepts gradually in a playful manner.</h2>
                  </Col>
                  <Col lg={{ span: 6, offset: 1 }}>
                    <ProgressBar theme="progressbar-style-01" data={ProgressBarData01} trailColor="transparent" height="4px" color="#232323" animation={fadeIn} />
                  </Col>
                </m.div> 
              </Container>
            </section>

            <Footer className="bg-[#ffeb04] py-20" theme="light" style={{ backgroundColor:"yellow", padding:"50px", color:"black"}}>
                <Container>
                  <Row>
                    <Col lg={4} className="justify-start md:justify-center md:mb-[20px] flex items-center">
                      <span className="font-serif font-semibold text-sm uppercase text-darkgray">Call us today! +91 7448427243</span>
                    </Col>
                    <Col lg={4} className="text-center md:mb-[20px]">
                      <SocialIcons theme="social-icon-style-12" iconColor="dark" size="md" data={SocialIconsData} />
                    </Col>
                    <Col lg={4} className="text-right justify-end md:justify-center md:text-center flex items-center">
                      <p className="font-serif font-semibold text-sm uppercase text-darkgray leading-[30px]">Copyright © 2022 - TechnologyGarage</p>
                    </Col>
                  </Row>                  
                </Container>
            </Footer>

        </div>
    )
}

export default Dashboard
