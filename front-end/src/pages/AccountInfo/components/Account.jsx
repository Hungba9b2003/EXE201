import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import userApi from '../../../api/userApi';
import { logout, update } from '../../Auth/userSlice';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    name: {
        width: '250px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    input: {
        flex: 1,
    },
    button: {
        justifyContent: 'center',
        textAlign: 'center',
        width: '200px',
    },
    wrapperButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: '#fdfdfd',
    },
}));

const validationSchema = Yup.object().shape({
    displayName: Yup.string().required('Tên hiển thị là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
    addressDetail: Yup.string().required('Số nhà, tên đường là bắt buộc'),
    contactPhone: Yup.string()
        .required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
        .min(10, 'Số điện thoại phải có ít nhất 10 số')
        .max(11, 'Số điện thoại không được quá 11 số'),
});

function Account() {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        displayName: '',
        address: '',
        addressDetail: '',
        contactPhone: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!token) {
            setError('Bạn chưa đăng nhập');
            return;
        }

        if (!userId) {
            setError('Không tìm thấy ID người dùng');
            return;
        }

        const fetchUserData = async () => {
            try {
                const userData = await userApi.getInfo(userId);
                setFormData(userData);
            } catch (error) {
                setError('Không thể lấy thông tin tài khoản');
            }
        };
        fetchUserData();
    }, [userId, token]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleUpdateUser = async (values, { setSubmitting }) => {
        try {
            const resultAction = await dispatch(update({ id: userId, ...values }));
            console.log('resultAction:', resultAction);

            // Kiểm tra nếu action bị rejected thì không unwrap
            if (update.fulfilled.match(resultAction)) {
                const response = unwrapResult(resultAction);
                console.log('response:', response);
                enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
                navigate('/products');
            } else {
                throw new Error('Cập nhật thất bại');
            }
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi cập nhật thông tin', { variant: 'error' });
        }
        setSubmitting(false);
    };

    if (!token) {
        return (
            <Box>
                <Container>
                    <Paper
                        elevation={0}
                        className={classes.paper}
                    >
                        <Typography
                            variant='h6'
                            color='error'
                            align='center'
                        >
                            Bạn chưa đăng nhập
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <Container>
                <Paper
                    elevation={0}
                    className={classes.paper}
                >
                    <Grid>
                        {error && <Typography color='error'>{error}</Typography>}
                        <Formik
                            initialValues={formData}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleUpdateUser}
                        >
                            {({ handleChange, handleBlur, errors, touched }) => (
                                <Form className={classes.wrapper}>
                                    <Box className={classes.item}>
                                        <Typography className={classes.name}>
                                            Tên hiển thị
                                        </Typography>
                                        <Field
                                            as={TextField}
                                            name='displayName'
                                            className={classes.input}
                                            variant='outlined'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.displayName && Boolean(errors.displayName)
                                            }
                                            helperText={touched.displayName && errors.displayName}
                                        />
                                    </Box>
                                    <Box className={classes.item}>
                                        <Typography className={classes.name}>
                                            Địa chỉ (Phường/Quận/Thành Phố)
                                        </Typography>
                                        <Field
                                            as={TextField}
                                            name='address'
                                            className={classes.input}
                                            variant='outlined'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                    </Box>
                                    <Box className={classes.item}>
                                        <Typography className={classes.name}>
                                            Số nhà, tên đường
                                        </Typography>
                                        <Field
                                            as={TextField}
                                            name='addressDetail'
                                            className={classes.input}
                                            variant='outlined'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.addressDetail &&
                                                Boolean(errors.addressDetail)
                                            }
                                            helperText={
                                                touched.addressDetail && errors.addressDetail
                                            }
                                        />
                                    </Box>
                                    <Box className={classes.item}>
                                        <Typography className={classes.name}>
                                            Số điện thoại
                                        </Typography>
                                        <Field
                                            as={TextField}
                                            name='contactPhone'
                                            className={classes.input}
                                            variant='outlined'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.contactPhone && Boolean(errors.contactPhone)
                                            }
                                            helperText={touched.contactPhone && errors.contactPhone}
                                        />
                                    </Box>
                                    <Box className={classes.wrapperButton}>
                                        <Button
                                            className={classes.button}
                                            variant='contained'
                                            color='primary'
                                            type='submit'
                                            style={{
                                                marginRight: '10px',
                                                background: 'black',
                                                borderRadius: '0px',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            Cập nhật
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            variant='contained'
                                            color='secondary'
                                            onClick={handleLogout}
                                            style={{
                                                marginRight: '10px',
                                                background: 'white',
                                                color: 'black',
                                                border: '1px solid black',
                                                fontWeight: 'bold',
                                                borderRadius: '0px',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            Đăng xuất
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default Account;
