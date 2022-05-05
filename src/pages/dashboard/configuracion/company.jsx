import * as Yup from 'yup';
// import MaskedInput from 'react-text-mask';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/Iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from '../../../utils/axios';
// layouts
import Layout from '../../../layouts';
// material
import HeaderDashboard from '../../../components/HeaderBreadcrumbs';
import { TextField, IconButton, Container, Grid, Card, Grow, InputLabel, MenuItem } from '@mui/material';

import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { configApp } from '../../../config';
// function TextMaskCustom(props) {
//   const { inputRef, ...other } = props;
//   return (
//     <MaskedInput
//       {...other}
//       ref={inputRef}
//       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//       placeholderChar={'\u2000'}
//       showMask
//     />
//   );
// }

CompanyPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default function CompanyPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  const [name, setName] = useState(0);
  const [IsSend, setIsSend] = useState(false);
  const changeValue = (e) => {
    setName(e.target.value);
  };
  const [ciudades, setCiudades] = useState([]);

  const init = async () => {
    const data2 = await axios.get('/company/');
    setData(data2.data[0]);
    const response = await axios.get(`/ciudad/`);
    setCiudades(response.data);
    setName(data2.data[0].ID_CIUDAD);
  };

  useEffect(() => {
    init();
  }, []);
  const CreditoClientShema = Yup.object().shape({
    rnc: Yup.string()
      .matches(/^[0-9]+$/, 'Solo Números')
      .test('len', 'Ingrese 9 o 11 dígitos', (val) => (val ? val.length === 9 || val.length === 11 : false))
      .required('Este un campo obligatorio'),
    nombre: Yup.string().required('Nombre es un campo obligatorio'),
    telefono: Yup.string().required('Teléfono es un campo obligatorio'),
    telefono2: Yup.string(),
    idCiudad: Yup.number().required('Ciudad es un campo obligatorio'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      telefono: data.TELEFONO_1,
      telefono2: data.TELEFONO_2,
      nombre: data.NOMBRE,
      idCiudad: data.ID_CIUDAD,
      direccion: data.DIRECCION,
      rnc: data.RNC,
    },
    validationSchema: CreditoClientShema,
    onSubmit: async (values) => {
      try {
        setIsSend(true);
        const resp = await axios.patch(`/company/`, {
          ID_COMPANY: data.ID_COMPANY,
          NOMBRE: values.nombre,
          TELEFONO_1: values.telefono,
          TELEFONO_2: values.telefono2,
          DIRECCION: values.direccion,
          RNC: values.rnc,
          ID_CIUDAD: name,
        });
        if (resp.status === 200) {
          enqueueSnackbar('Se editó correctamente', {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" onClick={() => closeSnackbar(key)}>
                <Iconify icon={'ci:close-big'} width="16" height="16" />
              </IconButton>
            ),
          });

          setIsSend(false);
        }
      } catch (err) {
        alert(JSON.stringify(err));
        console.log(err);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;
  return (
    <Page title={`Compañía | ${configApp.nameApp}`}>
      <Container>
        <HeaderDashboard
          heading="Compañía"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Configuración' }, { name: 'Compañía' }]}
        />
        <Grow in timeout={800}>
          <Card sx={{ minHeight: 600 }}>
            <div style={{ margin: 30 }}>
              <h2>Cambiar la configuración de la compañía</h2>
            </div>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid sx={{ m: 5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <InputLabel htmlFor="nombre">Nombre</InputLabel>
                      <TextField
                        fullWidth
                        autoComplete="nombre"
                        autoFocus
                        id="nombre"
                        type="text"
                        {...getFieldProps('nombre')}
                        error={Boolean(touched.nombre && errors.nombre)}
                        helperText={(touched.nombre && errors.nombre) || ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <InputLabel htmlFor="rnc">RNC</InputLabel>
                      <TextField
                        fullWidth
                        id="rnc"
                        type="text"
                        {...getFieldProps('rnc')}
                        error={Boolean(touched.rnc && errors.rnc)}
                        helperText={(touched.rnc && errors.rnc) || ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <InputLabel>La ciudad </InputLabel>
                      <TextField
                        name="idCiudad"
                        select
                        fullWidth
                        defaultValue={5}
                        value={name}
                        onChange={changeValue}
                        error={Boolean(touched.idCiudad && errors.idCiudad)}
                        helperText={(touched.idCiudad && errors.idCiudad) || ''}
                      >
                        {ciudades.map((option) => (
                          <MenuItem key={option.ID_CIUDAD} value={option.ID_CIUDAD}>
                            {option.NOMBRE}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="telefono">Teléfono 1</InputLabel>
                      <TextField
                        fullWidth
                        id="telefono"
                        {...getFieldProps('telefono')}
                        // InputProps={{ inputComponent: TextMaskCustom }}
                        error={Boolean(touched.telefono && errors.telefono)}
                        helperText={(touched.telefono && errors.telefono) || ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="telefono2">Teléfono 2</InputLabel>
                      <TextField
                        fullWidth
                        id="telefono2"
                        {...getFieldProps('telefono2')}
                        // InputProps={{ inputComponent: TextMaskCustom }}
                        error={Boolean(touched.telefono2 && errors.telefono2)}
                        helperText={(touched.telefono2 && errors.telefono2) || ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InputLabel htmlFor="direccion">Dirección</InputLabel>
                      <TextField
                        fullWidth
                        id="direccion"
                        multiline
                        rows={5}
                        {...getFieldProps('direccion')}
                        error={Boolean(touched.direccion && errors.direccion)}
                        helperText={(touched.direccion && errors.direccion) || ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <LoadingButton variant="contained" color="error" fullWidth type="button" onClick={resetForm}>
                        Cancelar
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <LoadingButton variant="contained" color="success" pending={IsSend} fullWidth type="submit">
                        Guardar
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Card>
        </Grow>
      </Container>
    </Page>
  );
}
