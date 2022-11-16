import React, { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { StyledFlex, StyledIconCloseBtn, StyledFlexEnd } from './style';

import { AiFillCloseCircle } from 'react-icons/ai';

import { UseMutationResult } from '@tanstack/react-query';

import Input from '@mui/material/Input';
import { theme } from 'styles/theme';
import { useGetIssueByIssueKey, useUpdateIssueByIssueKey } from 'hooks/issue';
import FillButton from 'components/atoms/Button';

interface propsType {
  issueSummary: string;
  issueCode: string;
  ganttChartId: number;
  projectId: number;
  deleteGantt: UseMutationResult<void, unknown, number, unknown>;
  // updateIssueByIssueKey: UseMutationResult<
  //   void,
  //   unknown,
  //   { issueKey: string; projectId: number; statusId: number; storyPoints: number; summary: string },
  //   unknown
  // >;
}

const index = ({
  issueSummary,
  issueCode,
  ganttChartId,
  deleteGantt,
  projectId,
}: // updateIssueByIssueKey,
propsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getIssueSummary, setIssueSummary] = useState(issueSummary);
  const [getStoryPoint, setStoryPoint] = useState<number>();

  const getIssueByIssueKey = useGetIssueByIssueKey(issueCode);
  const updateIssueByIssueKey = useUpdateIssueByIssueKey();

  useEffect(() => {
    if (getIssueByIssueKey.isSuccess) {
      setStoryPoint(getIssueByIssueKey.data.fields.customfield_10031);
    }
    if (updateIssueByIssueKey.isSuccess) {
      getIssueByIssueKey.refetch();
    }
  }, [getIssueByIssueKey.isSuccess, updateIssueByIssueKey.isSuccess]);

  return (
    <>
      {getIssueByIssueKey.data && (
        <Modal
          open={open as boolean}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            style: { opacity: 0.3 },
          }}
        >
          <Box
            sx={{
              position: 'absolute' as const,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              outline: 'none',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.button.green, fontWeight: 700 }}
            >
              이슈 제목
            </Typography>
            <Input
              type="text"
              id="modal-moal-description"
              defaultValue={getIssueSummary}
              onChange={e => setIssueSummary(e.currentTarget.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            ></Input>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.button.green, fontWeight: 700 }}
            >
              스토리 포인트
            </Typography>
            <Input
              type="number"
              id="modal-moal-description"
              defaultValue={getStoryPoint}
              onChange={e => setStoryPoint(+e.currentTarget.value)}
              fullWidth
            ></Input>
            <StyledFlexEnd>
              <FillButton
                width="80px"
                height="30px"
                backgroundColor={theme.button.green}
                clickHandler={() => {
                  updateIssueByIssueKey.mutate({
                    issueKey: issueCode,
                    projectId,
                    statusId: +getIssueByIssueKey.data.fields.status.id,
                    storyPoints: getStoryPoint as number,
                    summary: getIssueSummary,
                  });
                  handleClose();
                }}
              >
                수정
              </FillButton>
              <FillButton
                width="80px"
                height="30px"
                backgroundColor={theme.button.red}
                clickHandler={handleClose}
              >
                닫기
              </FillButton>
            </StyledFlexEnd>
          </Box>
        </Modal>
      )}

      <StyledFlex
        onClick={e => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!e.target.path) {
            handleOpen();
          }
        }}
      >
        <div
          style={{
            padding: '2px 4px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {issueSummary}
        </div>
        <StyledIconCloseBtn>
          <AiFillCloseCircle onClick={() => deleteGantt.mutate(ganttChartId)}></AiFillCloseCircle>
        </StyledIconCloseBtn>
      </StyledFlex>
    </>
  );
};

export default index;
