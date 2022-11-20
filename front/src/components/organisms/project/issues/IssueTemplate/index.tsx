import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  StyledIssueTemplate,
  StyledIssueTemplateHeader,
  StyledIssueTemplateBody,
  StyledIssueBundle,
  StyledIssueInfo,
  StyledIssueInfoHeader,
  StyledIssueInfoBody,
} from './style';
import { templateType } from 'components/pages/IssuesPage';
import Issue from 'components/molecules/Issue';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';
import { theme } from 'styles/theme';
import { HiPlus } from 'react-icons/hi';
import issueAxios from 'api/rest/issue';
import { useGetProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
const index = (props: any) => {
  const { projectId } = useParams();
  const pjtId = Number(projectId);
  const getProject = useGetProject(pjtId);
  const getUser = useGetUserInfoHandler();
  const getEpicList = issueAxios.getEpicList();
  const [epicList, setEpicList] = useState<string[]>();
  const [keyList, setKeyList] = useState<string[]>();
  const eList: string[] = [];
  const kList: string[] = [];
  const pushEpicList = async () => {
    for (let i = 0; i < (await getEpicList).issues.length; i++) {
      eList.push((await getEpicList).issues[i].fields.summary);
      kList.push((await getEpicList).issues[i].key);
    }
    console.log(await getEpicList);
    setEpicList(eList);
    setKeyList(kList);
  };

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editNo, setEditNo] = useState(0);
  const [issues, setIssues] = useState<templateType[]>([]);

  const getIssueTemplateList = issueAxios.getIssueTemplateList(pjtId);
  const iList: templateType[] = [];
  const pushIssueTemplateList = async () => {
    for (let i = 0; i < (await getIssueTemplateList).length; i++) {
      iList.push((await getIssueTemplateList)[i]);
    }
    setIssues(iList);
  };

  useEffect(() => {
    pushEpicList();
    pushIssueTemplateList();
  }, []);

  const issue = {
    issueTemplateId: props.issue.issueTemplateId,
    projectId: props.issue.projectId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    reporter: props.issue.reporter,
    assignee: getUser.data ? getUser.data.name : '',
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
  };

  const setInfoHandler = (issue: templateType) => {
    console.log(issue);
    props.setIssue(issue);
  };
  const deleteHandler = (issueTemplateId: number) => {
    issueAxios.deleteIssueTemplate(issueTemplateId);
    setIssues(issues.filter((issue: templateType) => issue.issueTemplateId !== issueTemplateId));
  };
  const editEnableHandler = (issueTemplateId: number) => {
    setIsEdit(true);
    setIsAdd(false);
    setEditNo(issueTemplateId);
  };
  const addEnableHandler = () => {
    setIsAdd(true);
    setIsEdit(false);
  };

  const IssueList = issues.map((issue: templateType) => (
    <Issue
      issueTemplateId={issue.issueTemplateId}
      projectId={pjtId}
      issueType={issue.issueType}
      summary={issue.summary}
      description={issue.description}
      reporter={getUser.data ? getUser.data.name : ''}
      assignee={getUser.data ? getUser.data.name : ''}
      priority={issue.priority}
      epicLink={issue.epicLink}
      storyPoints={issue.storyPoints}
      clickHandler={setInfoHandler}
      deleteHandler={deleteHandler}
      editEnableHandler={editEnableHandler}
    />
  ));

  useEffect(() => {
    setType(issue.issueType);
  }, [issue.issueType]);
  useEffect(() => {
    setPriority(issue.priority);
  }, [issue.priority]);
  useEffect(() => {
    setEpicLink(issue.epicLink);
  }, [issue.epicLink]);
  // IssueInfo 부분
  const [type, setType] = useState<string>('Story');
  const [priority, setPriority] = useState<string>('Highest');
  const priorityList = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const [epicLink, setEpicLink] = useState<string>('');
  const changeHandler = (e: any, content: string) => {
    const value = e.target.value;
    content === 'type'
      ? setType(value)
      : content === 'priority'
      ? setPriority(value)
      : content === 'epicLink'
      ? setEpicLink(value)
      : '';
  };

  const projectRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const storyPointsRef = useRef<HTMLInputElement>(null);

  const [templateId, setTemplateId] = useState<number>(0);
  const addTemplateHandler = () => {
    issue.issueTemplateId = templateId;
    issue.projectId = projectId;
    issue.issueType = type;
    issue.summary = summaryRef.current ? summaryRef.current.value : '';
    issue.description = descriptionRef.current ? descriptionRef.current.value : '';
    issue.epicLink = epicLink;
    issue.priority = priority;
    issue.storyPoints = storyPointsRef.current ? Number(storyPointsRef.current.value) : '';

    summaryRef.current ? (summaryRef.current.value = '') : '';
    descriptionRef.current ? (descriptionRef.current.value = '') : '';
    storyPointsRef.current ? (storyPointsRef.current.value = '0') : '';

    setTemplateId(templateId + 1);
    issues.push(issue);
    setIssues(issues);
    setIsAdd(false);
    issueAxios.postCreateIssueTemplate(
      issue.projectId,
      issue.issueType,
      issue.summary,
      issue.description,
      issue.assignee,
      issue.priority,
      issue.epicLink,
      issue.sprint,
      issue.storyPoints,
    );
  };

  const editTemplateHandler = () => {
    issues.forEach(issue => {
      if (issue.issueTemplateId === editNo) {
        issue.issueType = type;
        summaryRef.current ? (issue.summary = summaryRef.current.value) : '';
        descriptionRef.current ? (issue.description = descriptionRef.current.value) : '';
        issue.priority = priority;
        issue.epicLink = epicLink;
        storyPointsRef.current ? (issue.storyPoints = Number(storyPointsRef.current.value)) : '';
      }
      issueAxios.putEditIssueTemplate(
        issue.projectId,
        issue.issueType,
        issue.summary,
        issue.description,
        issue.priority,
        issue.epicLink,
        issue.storyPoints,
        issue.issueTemplateId,
      );
    });
    setIsEdit(false);
  };

  const insertIssueHandler = () => {
    props.setIssue({
      templateId: props.issue.templateId,
      projectId: projectId,
      issueType: type,
      summary: summaryRef.current ? summaryRef.current.value : '',
      description: descriptionRef.current ? descriptionRef.current.value : '',
      epicLink: epicLink,
      assignee: issue.assignee,
      priority: priority,
      storyPoints: storyPointsRef.current ? Number(storyPointsRef.current.value) : '',
    });
    props.setIsInsert(true);
  };
  return (
    <StyledIssueBundle>
      <StyledIssueTemplate>
        <StyledIssueTemplateHeader>
          <Circle height={'5rem'} margin={'1rem'}>
            로고
          </Circle>
          <Text
            isFill={false}
            message={getProject.data ? getProject.data.name : ''}
            fontSize={'2.5rem'}
          />
        </StyledIssueTemplateHeader>
        <hr style={{ backgroundColor: 'gray', borderColor: 'lightgray', width: '400px' }} />
        <Text isFill={false} message={'이슈 템플릿'} fontSize={'1.5rem'} fontWeight={'bold'} />
        <Sheet borderColor={'transparent'} flex={'column'} isOverflowYScroll>
          <StyledIssueTemplateBody>{IssueList}</StyledIssueTemplateBody>
        </Sheet>
        <Button
          width={'400px'}
          height={'90px'}
          borderColor={'#d9d9d9'}
          clickHandler={addEnableHandler}
          isHover
        >
          <HiPlus size={'1.5rem'} />
        </Button>
      </StyledIssueTemplate>
      <StyledIssueInfo>
        <StyledIssueInfoHeader>
          <Button
            borderColor={theme.issue.bug}
            isDisabled={!isAdd}
            isHover
            clickHandler={addTemplateHandler}
          >
            Add Template
          </Button>
          <Button
            borderColor={theme.issue.story}
            isDisabled={!isEdit}
            isHover
            clickHandler={editTemplateHandler}
          >
            Edit Template
          </Button>
          <Button borderColor={theme.issue.task} isHover clickHandler={insertIssueHandler}>
            Insert to Bucket
          </Button>
        </StyledIssueInfoHeader>
        <Sheet isShadow={false} flex={'column'} height={'90%'} isOverflowYScroll={true}>
          <StyledIssueInfoBody>
            <InputBox
              isRow={false}
              labelName={'프로젝트'}
              inputValue={getProject.data ? getProject.data.name : ''}
              ref={projectRef}
              disabled
            />
            <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
              <InputLabel id="demo-simple-select-label">이슈 유형</InputLabel>
              <Select
                labelId="inputType-Label"
                id="inputType"
                value={type}
                label="이슈 유형"
                onChange={e => {
                  changeHandler(e, 'type');
                }}
              >
                <MenuItem value={'Story'}>스토리</MenuItem>
                <MenuItem value={'Task'}>태스크</MenuItem>
                <MenuItem value={'Bug'}>버그</MenuItem>
              </Select>
            </FormControl>
            <InputBox
              isRow={false}
              labelName={'요약'}
              inputValue={props.issue.summary}
              ref={summaryRef}
            />
            <TextAreaBox
              isRow={false}
              labelName={'설명'}
              textAreaValue={props.issue.description}
              ref={descriptionRef}
            />
            {/* <SelectBox labelName={'담당자'} ref={assigneeRef}>
              <Option
                messages={memberList ? memberList : ['']}
                selected={props.issue.assignee}
              ></Option>
            </SelectBox>
            <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span> */}
            <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
              <InputLabel id="demo-simple-select-label">우선순위</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="우선순위"
                onChange={e => {
                  changeHandler(e, 'priority');
                }}
              >
                {priorityList.map((p, idx) => {
                  return (
                    <MenuItem key={idx} value={p}>
                      {p}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth style={{ margin: '5px 0 5px 0', padding: '0 5px 0 5px' }}>
              <InputLabel id="demo-simple-select-label">Epic Link</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={epicLink}
                label="이슈 유형"
                onChange={e => {
                  changeHandler(e, 'epicLink');
                }}
              >
                {keyList?.map((k, idx) => {
                  return (
                    <MenuItem key={idx} value={k}>
                      {epicList ? epicList[idx] : ''}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <InputBox
              isRow={false}
              labelName={'Story Points'}
              inputValue={props.issue.storyPoints + ''}
              ref={storyPointsRef}
            />
          </StyledIssueInfoBody>
        </Sheet>
      </StyledIssueInfo>
    </StyledIssueBundle>
  );
};

export default index;
