const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

require('dotenv').config(); 

client.once('ready', () => {
  console.log('Bot está online!');

  // Comando /cotizacion-eq
  const eqCommand = new SlashCommandBuilder()
    .setName('cotizacion-eq')
    .setDescription('Cotización completa para EQ')
    .addStringOption(option =>
      option.setName('tipo_servicio')
        .setDescription('Tipo de servicio')
        .setRequired(true)
        .addChoices(
          { name: 'Odoo', value: 'Odoo' },
          { name: 'Ondemand', value: 'Ondemand' },
          { name: 'Prepago', value: 'Prepago' },
          { name: 'Out Cancel', value: 'Out Cancel' },
          { name: 'SFTP', value: 'SFTP' }
        ))
    .addStringOption(option =>
      option.setName('nombre')
        .setDescription('Nombre del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('correo')
        .setDescription('Correo del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('telefono')
        .setDescription('Teléfono del cliente')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('cantidad_timbres')
        .setDescription('Cantidad de timbres por mes (solo para Prepago)')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('cantidad')
        .setDescription('Cantidad (solo para Out Cancel)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('recurrencia')
        .setDescription('¿Es recurrente? (Sí/No, solo para SFTP y Out Cancel)')
        .setRequired(false)
        .addChoices(
          { name: 'Sí', value: 'Sí' },
          { name: 'No', value: 'No' }
        ));

  // Comando /cotizacion-fk
  const fkCommand = new SlashCommandBuilder()
    .setName('cotizacion-fk')
    .setDescription('Cotización básica para FK')
    .addStringOption(option =>
      option.setName('tipo_servicio')
        .setDescription('Tipo de servicio')
        .setRequired(true)
        .addChoices(
          { name: 'Odoo', value: 'Odoo' },
          { name: 'Ondemand', value: 'Ondemand' },
          { name: 'Prepago', value: 'Prepago' },
          { name: 'Out Cancel', value: 'Out Cancel' },
          { name: 'SFTP', value: 'SFTP' }
        ))
    .addStringOption(option =>
      option.setName('nombre')
        .setDescription('Nombre del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('correo')
        .setDescription('Correo del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('telefono')
        .setDescription('Teléfono del cliente')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('cantidad')
        .setDescription('Cantidad (solo para Out Cancel)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('recurrencia')
        .setDescription('¿Es recurrente? (Sí/No, solo para SFTP y Out Cancel)')
        .setRequired(false)
        .addChoices(
          { name: 'Sí', value: 'Sí' },
          { name: 'No', value: 'No' }
        ));

  // Comando /cotizacion-yz
  const yzCommand = new SlashCommandBuilder()
    .setName('cotizacion-yz')
    .setDescription('Cotización básica para YZ')
    .addStringOption(option =>
      option.setName('nombre')
        .setDescription('Nombre del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('correo')
        .setDescription('Correo del cliente')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('telefono')
        .setDescription('Teléfono del cliente')
        .setRequired(true));

  // Registrar los comandos
  client.application.commands.create(eqCommand);
  client.application.commands.create(fkCommand);
  client.application.commands.create(yzCommand);
});

// Manejar las interacciones
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const saludo = `Buen día chicas, ¿nos podrían hacer el favor de enviar la cotización a este cliente?\n\n`;

  // Cotización EQ
  if (interaction.commandName === 'cotizacion-eq') {
    const tipoServicio = interaction.options.getString('tipo_servicio');
    const nombre = interaction.options.getString('nombre');
    const correo = interaction.options.getString('correo');
    const telefono = interaction.options.getString('telefono');
    const cantidadTimbres = interaction.options.getInteger('cantidad_timbres');
    const cantidad = interaction.options.getInteger('cantidad');
    const recurrencia = interaction.options.getString('recurrencia') || 'No especificado';

    let detallesServicio = '';
    if (tipoServicio === 'Prepago') {
      if (cantidadTimbres) {
        detallesServicio = `**Cant. Timbres:** ${cantidadTimbres} timbres por mes\n`;
      }
    } else if (tipoServicio === 'Out Cancel') {
      detallesServicio = `**Cantidad:** ${cantidad || 'No especificado'}\n` +
                        `**Recurrencia:** ${recurrencia}\n`;
    } else if (tipoServicio === 'SFTP') {
      detallesServicio = `**Recurrencia:** ${recurrencia}\n`;
    }

    await interaction.reply(
      `${saludo}` +
      `Se contactó por medio de **EQ**.\n\n` +
      `**Nombre:** ${nombre}\n` +
      `**Correo:** ${correo}\n` +
      `**Teléfono:** ${telefono}\n` +
      `**Tipo de Servicio:** ${tipoServicio}\n` +
      detallesServicio
    );
  }

  // Cotización FK
  if (interaction.commandName === 'cotizacion-fk') {
    const tipoServicio = interaction.options.getString('tipo_servicio');
    const nombre = interaction.options.getString('nombre');
    const correo = interaction.options.getString('correo');
    const telefono = interaction.options.getString('telefono');
    const cantidad = interaction.options.getInteger('cantidad');
    const recurrencia = interaction.options.getString('recurrencia') || 'No especificado';

    let detallesServicio = '';
    if (tipoServicio === 'Prepago') {
     
    } else if (tipoServicio === 'Out Cancel') {
      detallesServicio = `**Cantidad:** ${cantidad || 'No especificado'}\n` +
                        `**Recurrencia:** ${recurrencia}\n`;
    } else if (tipoServicio === 'SFTP') {
      detallesServicio = `**Recurrencia:** ${recurrencia}\n`;
    }

    await interaction.reply(
      `${saludo}` +
      `Cotización para **FK**:\n` +
      `**Nombre:** ${nombre}\n` +
      `**Correo:** ${correo}\n` +
      `**Teléfono:** ${telefono}\n` +
      `**Tipo de Servicio:** ${tipoServicio}\n` +
      detallesServicio
    );
  }

  // Cotización YZ
  if (interaction.commandName === 'cotizacion-yz') {
    const nombre = interaction.options.getString('nombre');
    const correo = interaction.options.getString('correo');
    const telefono = interaction.options.getString('telefono');

    await interaction.reply(
      `${saludo}` +
      `Cotización para **YZ**:\n` +
      `**Nombre:** ${nombre}\n` +
      `**Correo:** ${correo}\n` +
      `**Teléfono:** ${telefono}`
    );
  }
});

client.login(process.env.TOKEN);